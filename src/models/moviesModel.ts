import {DataTypes} from 'sequelize';
import {sequelize} from './../server.js';

export const Movies = sequelize.define(
    'Movies',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tmdb_id: {
            type: DataTypes.INTEGER,
        }
    },
);
