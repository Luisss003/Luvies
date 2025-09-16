import express from 'express';
let app = express();
import cors from "cors";
import moviesRouter from './routes/moviesRoutes.js';
import userRouter from './routes/userRoutes.js';
import tagsRouter from './routes/tagsRoutes.js';

app.use(cors());

app.use(express.json());

app.use('/movies', moviesRouter)
app.use('/users', userRouter);
app.use('/tags', tagsRouter);


export default app;