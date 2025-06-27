import { Request, Response } from "express";
import { getAllPostImages, getPostImageById, createPostImage, updatePostImage, deletePostImage } from "../services/PostImage.service";

export const getAllPostImagesController = async (req: Request, res: Response) => {
    try {
        const data = await getAllPostImages();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getPostImageByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await getPostImageById(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const createPostImageController = async (req: Request, res: Response) => {
    try {
        const {id, postid, imgurl} = req.body;
        const data = await createPostImage(parseInt(id), parseInt(postid), imgurl);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updatePostImageController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {postid, imgurl} = req.body;
        const data = await updatePostImage(parseInt(id), parseInt(postid), imgurl);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deletePostImageController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await deletePostImage(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};