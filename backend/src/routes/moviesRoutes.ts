import express from 'express';
const router = express.Router();
import * as movieController from '../controllers/moviesController';

router.route('/trending')
    .get(movieController.getTrendingMovies);

router.route('/:id')
    .get(movieController.getMovieDetails);

router.route('/:id/tag')
    .post(movieController.tagMovie);

router.route('/recommend/:id')
    .get(movieController.recommendSimilarMovies);
    
export default router;
