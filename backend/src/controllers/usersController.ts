import { Request, Response } from "express";
import prisma from '../services/databaseService.js';
import { User } from "@prisma/client";
//import
export const createUser = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
         res.status(400).json({
            status: 'fail',
            message: 'Email, password, and username are required'
        });
    }

    const newUser = await prisma.user.create({
        data: {
            email,
            password,
            username
        }
    });

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
}