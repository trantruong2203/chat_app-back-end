import { Request, Response } from "express";
import { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage } from "../services/Message.service";

export const getAllMessagesController = async (req: Request, res: Response) => {
    try {
        const data = await getAllMessages();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getMessageByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await getMessageById(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const createMessageController = async (req: Request, res: Response) => {
    try {
        const {id, senderid, receiverid, groupid, content, sentat, status, messageid} = req.body;
        const data = await createMessage(id, senderid, receiverid, groupid, content, sentat, status, messageid);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateMessageController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {senderid, receiverid, groupid, content, sentat, status, messageid} = req.body;
        const data = await updateMessage(parseInt(id), senderid, receiverid, groupid, content, sentat, status, messageid);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteMessageController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await deleteMessage(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};