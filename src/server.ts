import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';
dotenv.config({path: './../config.env'});

//Create server
const server = app.listen(process.env.SERVER_PORT, () => {
    console.log('server has started...');
});
