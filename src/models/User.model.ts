import { db } from "../config/db";
import { User } from "../types/interface";



export const getAllUsers = async (): Promise<User[]> => {
    const [results] = await db.query('SELECT id, username, password, birthday, gender, phone, avatar, email, createat, CAST(status AS UNSIGNED) as status FROM user');
    return results as User[];
};

export const getUserById = async (email: string): Promise<User[]> => {
    const [results] = await db.query('SELECT id, username, password, birthday, gender, phone, avatar, email, createat, CAST(status AS UNSIGNED) as status FROM user WHERE email = ?', [email]);
    return results as User[];
};

export const createUser = async (username: string, password: string, birthday: Date, avatar: string, phone: string, email: string, createat: Date): Promise<any> => {
    const [results] = await db.query('INSERT INTO user (username, password, birthday, avatar, phone, email, createat) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, password, birthday, avatar, phone, email, createat]);
    return {
        success: true,
        message: 'User created successfully',
        data: results
    };
};

export const updateUserDynamic = async (email: string, fieldsToUpdate: Partial<{ 
    username: string, 
    birthday: Date,  
    gender: string,
    phone: string,
    avatar: string,
    status: number
  }>) => {
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      throw new Error('Không có thông tin nào để cập nhật');
    }
  
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const values = keys.map(key => (fieldsToUpdate as any)[key]);
  
    const query = `UPDATE user SET ${setClause} WHERE email = ?`;
    const [result] = await db.query(query, [...values, email]);
  
    return result;
  };

  
export const deleteUser = async (email: string): Promise<any> => {
    const [results] = await db.query('DELETE FROM user WHERE email = ?', [email]);
    return {
        success: true,
        message: 'User deleted successfully',
        data: results
    };
};

export const updatePassword = async (email: string, password: string): Promise<any> => {
    const [results] = await db.query('UPDATE user SET password = ? WHERE email = ?', [password, email]);
    return {
        success: true,
        message: 'Password updated successfully',
        data: results
    };
};

export const updateAvatar = async (email: string, avatarUrl: string): Promise<any> => {
    const [results] = await db.query('UPDATE user SET avatar = ? WHERE email = ?', [avatarUrl, email]);
    return {
        success: true,
        message: 'Avatar updated successfully',
        data: results
    };
};
