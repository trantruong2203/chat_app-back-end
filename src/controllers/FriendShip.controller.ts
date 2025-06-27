import { Request, Response } from "express";
import { createFriendShip, deleteFriendShip, getAllFriendShips, getFriendShipById, updateFriendShip } from "../services/FriendShip.service";

export const getFriendShipsController = async (req: Request, res: Response) => {
    try {
        const data = await getAllFriendShips();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getFriendShipByIdController = async (req: Request, res: Response) => {
    try {
        const data = await getFriendShipById(parseInt(req.params.id));
        if (!data) {
            return res.status(404).json({message: "Friendship not found"});
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};  

export const createFriendShipController = async (req: Request, res: Response) => {
    const { id, userid, sentat, status } = req.body;
    try {
        const data = await createFriendShip(parseInt(id), parseInt(userid), new Date(sentat), status);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateFriendShipController = async (req: Request, res: Response) => {
    const {id} = req.params;
    const { userid, sentat, status } = req.body;
    try {
        const data = await updateFriendShip(parseInt(id), parseInt(userid), new Date(sentat), status);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteFriendShipController = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
         const data = await deleteFriendShip(parseInt(id));
         res.status(204).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};
