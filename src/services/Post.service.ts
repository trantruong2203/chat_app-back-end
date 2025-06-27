
import { db } from '../config/db';
import { Post } from "../models/Post.model";

export const getAllPosts = async (): Promise<Post[]> => {
    const [results] = await db.query('SELECT * FROM post');
    return results as Post[];
};

export const getPostById = async (id: number): Promise<Post[]> => {
    const [results] = await db.query('SELECT * FROM post WHERE id = ?', [id]);
    return results as Post[];
};
export const createPost = async (id: number, userid: number, content: string, createdat: Date, status: boolean): Promise<any> => {
    const [results] = await db.query('INSERT INTO post (id, userid, content, createdat, status) VALUES (?, ?, ?, ?, ?)', [id, userid, content, createdat, status]);
    return (
        {
            success: true,
            message: 'Post created successfully',
            data: results
        }
    )
};
export const updatePost = async (id: number, userid: number, content: string, createdat: Date, status: boolean): Promise<any> => {
    const [results] = await db.query('UPDATE post SET userid = ?, content = ?, createdat = ?, status = ? WHERE id = ?', [userid, content, createdat, status, id]);
    return (
        {
            success: true,
            message: 'Post updated successfully',
            data: results
        }
    )
};

export const deletePost = async (id: number): Promise<any> => {
    const [results] = await db.query('DELETE FROM post WHERE id = ?', [id]);
    return (
        {
            success: true,
            message: 'Post deleted successfully',
            data: results
        }
    )
};
