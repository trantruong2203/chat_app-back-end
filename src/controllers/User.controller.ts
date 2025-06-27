import { Request, Response } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/User.service";

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const data = await getAllUsers();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const data = await getUserById(parseInt(req.params.id));
        if (!data || data.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({error});
    }
};  

export const createUserController = async (req: Request, res: Response) => {
    const { id, username, birthday, avatar, password, status, phone, email, createat } = req.body;
    try {
        const data = await createUser(id, username, birthday, avatar, password, status, phone, email, createat);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    const {id} = req.params;
    const { username, birthday, avatar, password, status, phone, email, createat } = req.body;
    try {
        const data = await updateUser(parseInt(id), username, birthday, avatar, password, status, phone, email, createat);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
         const data = await deleteUser(parseInt(id));
         res.status(204).send();
    } catch (error) {
        res.status(500).json({error});
    }
};
