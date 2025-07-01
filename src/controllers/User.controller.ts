import { NextFunction, Request, Response } from "express";
import * as UserService from '../services/User.service';

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const data = await UserService.getAllUsers();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getUserByAccountController = async (req: Request, res: Response) => {
    const {email} = req.params;
    try {
        const data = await UserService.getUserByAccount(email);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password} = req.body;
   try {
       const data = await UserService.login(email, password);
       res.status(200).json(data);
   } catch (err) {
       next(err);
   }
};
export const createUserController = async (req: Request, res: Response) => {
    const { username, password, email, phone, birthday, avatar } = req.body;
    try {
        const data = await UserService.createUser(username, password, email, phone, birthday, avatar);
        res.status(201).json(data);
    } catch (error: any) {
        if (error.status) {
            res.status(error.status).json({error: error.message});
        } else {
            res.status(500).json({error});
        }
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    const {email} = req.params;
    const { password } = req.body;
    try {
        const data = await UserService.updateUser(email, password);
        res.status(200).json(data);
    } catch (error: any) {
        if (error.status) {
            res.status(error.status).json({error: error.message});
        } else {
            res.status(500).json({error});
        }
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const {email} = req.params;
    try {
         const data = await UserService.deleteUser(email);
         res.status(204).send();
    } catch (error: any) {
        if (error.status) {
            res.status(error.status).json({error: error.message});
        } else {
            res.status(500).json({error});
        }
    }
};
