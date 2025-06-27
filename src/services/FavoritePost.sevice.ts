import { FavoritePost } from "../models/FavoritePost.model";
import { db } from '../config/db';

export const getAllFavoritePosts = async (): Promise<FavoritePost[]> => {
    const [results] = await db.query('SELECT * FROM favoritepost');
    return results as FavoritePost[];
};

export const getFavoritePostById = async (id: number): Promise<FavoritePost[]> => {
    const [results] = await db.query('SELECT * FROM favoritepost WHERE id = ?', [id]);
    return results as FavoritePost[];
};

export const createFavoritePost = async (id: number, userid: number, postid: number, createdat: Date, iconid: number): Promise<any> => {
    const [results] = await db.query('INSERT INTO favoritepost (id, userid, postid, createdat, iconid) VALUES (?, ?, ?, ?, ?)', [id, userid, postid, createdat, iconid]);
    return (
        {
            success: true,
            message: 'Favorite post created successfully',
            data: results
        }
    )
};

export const updateFavoritePost = async (id: number, userid: number, postid: number, createdat: Date, iconid: number): Promise<any> => {
    const [results] = await db.query('UPDATE favoritepost SET userid = ?, postid = ?, createdat = ?, iconid = ? WHERE id = ?', [userid, postid, createdat, iconid, id]);
    return (
        {
            success: true,
            message: 'Favorite post updated successfully',
            data: results
        }
    )
};

export const deleteFavoritePost = async (id: number): Promise<any> => {
    const [results] = await db.query('DELETE FROM favoritepost WHERE id = ?', [id]);
    return (
        {
            success: true,
            message: 'Favorite post deleted successfully',
            data: results
        }
    )
};
