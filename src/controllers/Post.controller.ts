import { Request, Response } from "express";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "../services/Post.service";

export const getPostsController = async (req: Request, res: Response) => {
    try {
        const data = await getAllPosts();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getPostByIdController = async (req: Request, res: Response) => {
    try {
        const data = await getPostById(parseInt(req.params.id));
        if (!data || data.length === 0) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({error});
    }
};  

export const createPostController = async (req: Request, res: Response) => {
    const { id, userid, content, createdat, status } = req.body;
    try {
        const data = await createPost(id, userid, content, createdat, status);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updatePostController = async (req: Request, res: Response) => {
    const {id} = req.params;
    const { userid, content, createdat, status } = req.body;
    try {
        const data = await updatePost(parseInt(id), userid, content, createdat, status);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deletePostController = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
         const data = await deletePost(parseInt(id));
         res.status(204).send();
    } catch (error) {
        res.status(500).json({error});
    }
};
