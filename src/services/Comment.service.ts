import { Comment } from "../models/Comment.model";
import { db } from "../config/db";

export const getAllComments = async (): Promise<Comment[]> => {
    const [results] = await db.query( 'select * from comment');
    return results as Comment[];
};

export const getCommentById = async (id: number): Promise<Comment[]> => {
    const [results] = await db.query('select * from comment where id = ?', [id]);
    return results as Comment[];
};

export const createComment = async (comment: Comment): Promise<Comment[]> => {
    const [results] = await db.query('insert into comment (id, userid, postid, content, iconid, imageurl, commentid, createdat) values (?, ?, ?, ?, ?, ?, ?, ?)', [comment.id, comment.userid, comment.postid, comment.content, comment.iconid, comment.imageurl, comment.commentid, comment.createdat]);
    return results as Comment[];
};

export const updateComment = async (id: number, comment: Comment): Promise<Comment[]> => {
    const [results] = await db.query('update comment set userid = ?, postid = ?, content = ?, iconid = ?, imageurl = ?, commentid = ?, createdat = ? where id = ?', [comment.userid, comment.postid, comment.content, comment.iconid, comment.imageurl, comment.commentid, comment.createdat, id]);
    return results as Comment[];
};

export const deleteComment = async (id: number): Promise<Comment[]> => {
    const [results] = await db.query('delete from comment where id = ?', [id]);
    return results as Comment[];
}