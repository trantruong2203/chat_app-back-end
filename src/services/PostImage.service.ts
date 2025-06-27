import { PostImage } from "../models/PostImage.model";
import { db } from "../config/db";

export const getAllPostImages = async (): Promise<PostImage[]> => {
    const [results] = await db.query('SELECT * FROM postimage');
    return results as PostImage[];
};

export const getPostImageById = async (id: number): Promise<PostImage[]> => {
    const [results] = await db.query('SELECT * FROM postimage WHERE id = ?', [id]);
    return results as PostImage[];
};

export const createPostImage = async (id: number, postid: number, imgurl: string): Promise<PostImage[]> => {
    const [results] = await db.query('INSERT INTO postimage (id, postid, imgurl) VALUES (?, ?, ?)', [id, postid, imgurl]);
    return results as PostImage[];
};

export const updatePostImage = async (id: number, postid: number, imgurl: string): Promise<PostImage[]> => {
    const [results] = await db.query('UPDATE postimage SET postid = ?, imgurl = ? WHERE id = ?', [postid, imgurl, id]);
    return results as PostImage[];
};

export const deletePostImage = async (id: number): Promise<PostImage[]> => {
    const [results] = await db.query('DELETE FROM postimage WHERE id = ?', [id]);
    return results as PostImage[];
};