import { Request, Response } from 'express';
import { tmdbService } from '../services/tmdbService';
import prisma from '../services/databaseService.js';
import { Tag} from '@prisma/client';

//returns the top 10 trending movies of the week
export const getTrendingMovies = async (req: Request, res: Response) => {
    const movies = await tmdbService.getTrendingMovies(10);
    res.status(200).json({
        status: 'success',
        results: movies.length,
        data: {
            movies
        }
    })
};

//returns detailed info for a specific movie by ID + user tags
export const getMovieDetails = async (req: Request, res: Response) => {
    //Fetch movie from TMDB
    const movieDetails = await tmdbService.getMovieDetails(Number(req.params.id));
    
    //Get movie entry from local DB
    const movie = await prisma.movie.findUnique({
        where: { tmdbId: Number(req.params.id) },
    })

    let tags: Tag[] = [];
    //If it exist, we can access it's user tags
    if(movie){
        //Fetch all tags associated with this movie
        tags = await prisma.tag.findMany({
        where: {
            movies: {
            some: {
                tmdbId: Number(req.params.id)
            }
            }
        }
        });
    }else{
    //If doesnt exist, simply display empty fields for movie tags
    //and add movie ID to our local DB
        const movieCreated = await prisma.movie.create({
            data: {
                tmdbId: Number(req.params.id),
            }
        })
    }

    res.status(200).json({
        status: "success",
        data: { 
            movieDetails,
            tags
        }
    });
}

//Tags a movie by acceping post to URL with TMDB movie ID
export const tagMovie = async (req: Request, res: Response) => {
    //Extract tag name from request body
    const { tagName, userIdString } = req.body;
    if(!userIdString){
         res.status(400).json({
            status: 'fail',
            message: 'User ID is required'
        });
        return;
    }
    const userId = parseInt(userIdString);
    if(!tagName || tagName.trim() === ''){
         res.status(400).json({
            status: 'fail',
            message: 'Tag name is required'
        });
        return;
    }
    
    //Check if movie exists in local DB
    let movie = await prisma.movie.findUnique({
        where: { tmdbId: Number(req.params.id) },
    })
    if(!movie){
        //If doesnt exist, add movie ID to our local DB
        movie = await prisma.movie.create({
            data: {
                tmdbId: Number(req.params.id),
            }
        })
    }

    //Check if tag with this name already exists
    const existingTag = await prisma.tag.findUnique({
        where: { name: tagName.trim() }
    });
    
    if (existingTag) {
        //Check if this tag is already associated with this movie
        const movieWithTag = await prisma.movie.findUnique({
            where: { id: movie.id },
            include: {
                tags: {
                    where: {
                        name: tagName.trim()
                    }
                }
            }
        });
        
        if (movieWithTag && movieWithTag.tags.length > 0) {
                res.status(400).json({
                status: 'fail',
                message: 'This movie is already tagged with this name'
            });
            return;

        }
        
        //Tag exists but not associated with this movie, so associate it
        await prisma.movie.update({
            where: { id: movie.id },
            data: {
                tags: {
                    connect: { id: existingTag.id }
                }
            }
        });
        
        res.status(200).json({
            status: 'success',
            message: 'Movie tagged successfully with existing tag'
        });
        return;
    }
    
    //Tag doesn't exist, create it and associate with movie    
    const newTag = await prisma.tag.create({
        data: {
            name: tagName.trim(),
            createdById: userId,
            movies: {
                connect: { id: movie.id }
            }
        }
    });
 
    res.status(201).json({
        status: 'success',
        message: 'Tag created and movie tagged successfully',
        tag: newTag
    });
    return;
};