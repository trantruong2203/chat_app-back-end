import { Request, Response } from "express";
import { createFavoritePost, deleteFavoritePost, getAllFavoritePosts, getFavoritePostById, updateFavoritePost } from "../services/FavoritePost.sevice";

export const getFavoritePostsController = async (req: Request, res: Response) => {
    try {
        const data = await getAllFavoritePosts();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getFavoritePostByIdController = async (req: Request, res: Response) => {
    try {
        const data = await getFavoritePostById(parseInt(req.params.id));
        if (!data || data.length === 0) {
            return res.status(404).json({message: "Favorite post not found"});
        }
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({error});
    }
};  

export const createFavoritePostController = async (req: Request, res: Response) => {
    const { id, userid, postid, createdat, iconid } = req.body;
    try {
        const data = await createFavoritePost(id, userid, postid, createdat, iconid);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateFavoritePostController = async (req: Request, res: Response) => {
    const {id} = req.params;
    const { userid, postid, createdat, iconid } = req.body;
    try {
        const data = await updateFavoritePost(parseInt(id), userid, postid, createdat, iconid);
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteFavoritePostController = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
         const data = await deleteFavoritePost(parseInt(id));
         res.status(204).send();
    } catch (error) {
        res.status(500).json({error});
    }
};
