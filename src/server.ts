import dotenv from 'dotenv';
import app from './app';
import { Sequelize } from 'sequelize';

dotenv.config({path: './../config.env'});

//Create Sequelize instance
export const sequelize = new Sequelize('Luvies', process.env.MY_SQL_USERNAME!, 
                                process.env.MY_SQL_PASSWRD!, {
                                    host: process.env.MY_SQL_HOST!,
                                    dialect: 'mysql',
                                });

//Connect to MySQL remote server, create tables, then start server
(async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established to Luvies...');
        //Create tables in Luvies DB


        //Begin server listener
        app.listen(8000, () => {
            console.log('Express server has started...');
        });
    }catch(error){
        throw new Error('Unable to connect to database...');
    }
})