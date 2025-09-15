import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY =  process.env.TMDB_API_KEY || ''; 

class TMDBService {
    
    //Create singleton axios instance for TMDB API request
    private client = axios.create({
        baseURL: TMDB_BASE_URL,
        params: {
            api_key: TMDB_API_KEY,
        },
    });

    //Fetch curr week's top trending movies from TMDB, default limit to 10
    async getTrendingMovies(limit: number = 10) {
        console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY);
        const response = await this.client.get('/trending/movie/week', {
            params: { 
                language: 'en-US', 
                page: 1 
            },
        });
        return response.data.results.slice(0, limit);
    }

    async getMovieDetails(movieId: number){
        const response = await this.client.get(`/movie/${movieId}`, {
            params: { language: 'en-US' },
        });
        return response.data;
    }
}

//Create and export a singleton instance
export const tmdbService = new TMDBService();