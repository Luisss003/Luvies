import dotenv from 'dotenv';
dotenv.config({path: './.env'});

import app from './app';

app.listen(8001, () => {
    console.log('Server is running on port 8000');
})