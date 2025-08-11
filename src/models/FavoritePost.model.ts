import { db } from "../config/db";
import { ChatGroup, FavoritePost } from "../types/interface";



export const getAllFavoritePosts = async (): Promise<FavoritePost[]> => {
    const [results] = await db.query('SELECT id, userid, postid, createdat, CAST(iconid AS UNSIGNED) as iconid FROM favoritepost');
    return results as FavoritePost[];
};

export const getFavoritePostById = async (id: number): Promise<FavoritePost[]> => {
    const [results] = await db.query('SELECT id, userid, postid, createdat, CAST(iconid AS UNSIGNED) as iconid FROM favoritepost WHERE id = ?', [id]);
    return results as FavoritePost[];
};

export const createFavoritePost = async (userid: number, postid: number, createdat: string, iconid: number): Promise<any> => {
    const [results] = await db.query('INSERT INTO favoritepost (userid, postid, createdat, iconid) VALUES (?, ?, ?, ?)', [userid, postid, createdat, iconid]);
    return {
        success: true,
        message: 'Favorite post created successfully',
        data: results
    };
};

export const updateFavoritePostDynamic = async (id: number, fieldsToUpdate: Partial<{ 
    userid: number, 
    postid: number,
    createdat: string,
    iconid: number
  }>) => {
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      throw new Error('Không có thông tin nào để cập nhật');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => (fieldsToUpdate as any)[key]);
  
    const query = `UPDATE favoritepost SET ${setClause} WHERE id = ?`;
    const [result] = await db.query(query, [...values, id]);
  
    return result;
  };

  
export const deleteFavoritePost = async (postid: number, userid: number): Promise<any> => {
    // Kiểm tra xem record có tồn tại không
    const [existingRecord] = await db.query('SELECT id FROM favoritepost WHERE postid = ? AND userid = ?', [postid, userid]);
    if (!(existingRecord as any[]).length) {
        throw new Error('Favorite post not found');
    }
    
    const [results] = await db.query('DELETE FROM favoritepost WHERE postid = ? AND userid = ?', [postid, userid]);
    return {
        success: true,
        message: 'Favorite post deleted successfully',
        data: { postid, userid, deletedRows: (results as any).affectedRows }
    };
};

export const countFavoritePost = async (postid: number): Promise<number> => {
    const [results] = await db.query('SELECT COUNT(*) as count FROM favoritepost WHERE postid = ?', [postid]);
    return (results as any[])[0]?.count || 0;
};
    