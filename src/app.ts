import express from 'express';
let app = express();

//Routes
app.use('/api/v1/movies/', moviesRouter);


//Catch-All Route


export default app;