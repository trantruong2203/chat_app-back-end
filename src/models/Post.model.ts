import { db } from "../config/db";
import { Post } from "../types/interface";



export const getAllPosts = async (): Promise<Post[]> => {
    const [results] = await db.query('SELECT id, userid, content, createdat, CAST(status AS UNSIGNED) as status FROM post');
    return results as Post[];
};

export const getPostById = async (id: number): Promise<Post[]> => {
    const [results] = await db.query('SELECT id, userid, content, createdat, CAST(status AS UNSIGNED) as status FROM post WHERE id = ?', [id]);
    return results as Post[];
};

export const createPost = async (userid: number, content: string, createdat: string, status: number): Promise<any> => {
    const [results] = await db.query('INSERT INTO post (userid, content, createdat, status) VALUES (?, ?, ?, ?)', [userid, content, createdat, status]);
    return {
        success: true,
        message: 'Post created successfully',
        data: results
    };
};

export const updatePostDynamic = async (id: number, fieldsToUpdate: Partial<{ 
    userid: number, 
    content: string,
    status: number
  }>) => {
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      throw new Error('Không có thông tin nào để cập nhật');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => (fieldsToUpdate as any)[key]);
  
    const query = `UPDATE post SET ${setClause} WHERE id = ?`;
    const [result] = await db.query(query, [...values, id]);
  
    return result;
  };

  
export const deletePost = async (id: number): Promise<any> => {
    const [results] = await db.query('DELETE FROM post WHERE id = ?', [id]);
    return {
        success: true,
        message: 'Post deleted successfully',
        data: results
    };
};


