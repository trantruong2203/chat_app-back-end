import { db } from "../config/db";

export interface User {
    id?: number;
    username: string;
    avatar: string;
    email: string;
    password: string;
    status: boolean;
    birthday: Date;
    createat: Date;
    phone: string;
};

export const getAllUsers = async (): Promise<User[]> => {
    const [results] = await db.query('SELECT * FROM user');
    return results as User[];
};

export const getUserById = async (email: string): Promise<User[]> => {
    const [results] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    return results as User[];
};

export const createUser = async (username: string, birthday: Date, avatar: string, password: string, phone: string, email: string, createat: Date): Promise<any> => {
    const [results] = await db.query('INSERT INTO user (username, birthday, avatar, password, phone, email, createat) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, birthday, avatar, password, phone, email, createat]);
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
    avatar: string
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


