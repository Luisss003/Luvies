import express from 'express';
const router = express.Router();

import * as userController from '../controllers/usersController';

router.route('/')
    .post(userController.createUser);

export default router;