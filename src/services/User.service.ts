import { User } from "../models/User.model";
import { db } from '../config/db';

export const getAllUsers = async (): Promise<User[]> => {
    const [results] = await db.query('SELECT * FROM user');
    return results as User[];
};

export const getUserById = async (id: number): Promise<User[]> => {
    const [results] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    return results as User[];
};

export const createUser = async (id: number, username: string, birthday: Date, avatar: string, password: string, status: boolean, phone: number, email: string, createat: Date): Promise<any> => {
    const [results] = await db.query('INSERT INTO user (id, username, birthday, avatar, password, status, phone, email, createat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, username, birthday, avatar, password, status, phone, email, createat]);
    return (
        {
            success: true,
            message: 'User created successfully',
            data: results
        }
    )
};

export const updateUser = async (id: number, username: string, birthday: Date, avatar: string, password: string, status: boolean, phone: number, email: string, createat: Date): Promise<any> => {
    const [results] = await db.query('UPDATE user SET username = ?, birthday = ?, avatar = ?, password = ?, status = ?, phone = ?, email = ?, createat = ? WHERE id = ?', [username, birthday, avatar, password, status, phone, email, createat, id]);
    return (
        {
            success: true,
            message: 'User updated successfully',
            data: results
        }
    )
};

export const deleteUser = async (id: number): Promise<any> => {
    const [results] = await db.query('DELETE FROM user WHERE id = ?', [id]);
    return (
        {
            success: true,
            message: 'User deleted successfully',
            data: results
        }
    )
};
