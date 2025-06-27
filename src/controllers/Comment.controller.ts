import { Request, Response } from "express";
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../services/Comment.service";

export const getCommentsController = async (req: Request, res: Response) => {
    try {
        const data = await getAllComments();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getCommentByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await getCommentById(parseInt(id));
        if (!data || data.length === 0) {
            return res.status(404).json({message: "Comment not found"});
        }
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const createCommentController = async (req: Request, res: Response) => {
    try {
        const {id, userid, postid, content, iconid, imageurl, commentid, createdat} = req.body;
        const data = await createComment({id: parseInt(id), userid, postid, content, iconid, imageurl, commentid, createdat});
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateCommentController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {userid, postid, content, iconid, imageurl, commentid, createdat} = req.body;
        const data = await updateComment(parseInt(id), {id: parseInt(id), userid, postid, content, iconid, imageurl, commentid, createdat});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteCommentController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await deleteComment(parseInt(id));
        res.status(204).send();
    } catch (error) {
        res.status(500).json({error});
    }
};