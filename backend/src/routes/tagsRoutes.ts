import express from 'express';
const router = express.Router();
import * as tagsController from '../controllers/tagsController';

router.route('/puzzle')
    .post(tagsController.puzzleMovieTags);

export default router;