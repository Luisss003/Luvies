import express from 'express';
let app = express();
import moviesRouter from './routes/moviesRoutes.js';
import userRouter from './routes/userRoutes.js';
app.use(express.json());

app.use('/movies', moviesRouter)
app.use('/users', userRouter);


export default app;