import { Request, Response } from "express";
import { tmdbService } from "../services/tmdbService";
import prisma from "../services/databaseService";
import { Tag } from "@prisma/client";

/**
 * Expected Body:
 * {
 *   "tags": [ "tag1", "tag2", ... ],
 * }
 * 
 * Should return a list of movies that have ALL the specified tags.
 */
export const puzzleMovieTags = async (req: Request, res: Response) => {
    //Export tags from request body
    const { tags } = req.body;
    if(!tags || !Array.isArray(tags) || tags.length === 0){
        res.status(400).json({
            status: 'fail',
            message: 'Tags array is required'
        });
        return;
    }

    console.log("Tags received for puzzle:", tags);
    
    //First, get all of the movies that contain the first tag in the array
    //TODO: Add a "popular" counter in tags model so that in the future,
    //when we receieve that array, we can get all the movies that contain
    //the most obscure tag first, then filter down from there.
    let filteredMovies = await prisma.movie.findMany({
        where: {
            tags: {
                some: {
                    name: tags[0]
                }
            }
        },
        include: {
            tags: true
        }
    });

    // Filter for exact matches (movies that have ALL and ONLY the tags we want)
    for (let i = 1; i < tags.length; i++) {
        const tag = tags[i];
        filteredMovies = filteredMovies.filter(movie =>
            movie.tags.some(t => t.name === tag)
        );
    }

    res.status(200).json({
        status: 'success',
        results: filteredMovies.length,
        data: {
            movies: filteredMovies
        }
    }); 
}