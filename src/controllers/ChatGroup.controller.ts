import { Request, Response } from "express";
import { getAllChatGroups, getChatGroupById, createChatGroup, updateChatGroup, deleteChatGroup } from "../services/ChatGroup.service";

export const getAllChatGroupsController = async (req: Request, res: Response) => {
    try {
        const data = await getAllChatGroups();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getChatGroupByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await getChatGroupById(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const createChatGroupController = async (req: Request, res: Response) => {
    try {
        const {id, name, avatar, creatorid, createdat, status} = req.body;
        const data = await createChatGroup(parseInt(id), name, avatar, parseInt(creatorid), new Date(createdat), status);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateChatGroupController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {name, avatar, creatorid, createdat, status} = req.body;
        const data = await updateChatGroup(parseInt(id), name, avatar, parseInt(creatorid), new Date(createdat), status);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteChatGroupController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await deleteChatGroup(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};