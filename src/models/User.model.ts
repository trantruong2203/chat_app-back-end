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

export const updateUser = async (id: number, username: string, birthday: Date, avatar: string, password: string, phone: string, email: string, createat: Date): Promise<any> => {
    const [results] = await db.query('UPDATE user SET username = ?, birthday = ?, avatar = ?, password = ?, phone = ?, email = ?, createat = ? WHERE id = ?', [username, birthday, avatar, password, phone, email, createat, id]);
    return {
        success: true,
        message: 'User updated successfully',
        data: results
    };
};

export const deleteUser = async (id: number): Promise<any> => {
    const [results] = await db.query('DELETE FROM user WHERE id = ?', [id]);
    return {
        success: true,
        message: 'User deleted successfully',
        data: results
    };
};
