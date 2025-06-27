import { Role } from "../models/Role.model";
import { db } from "../config/db";

export const getAllRoles = async (): Promise<Role[]> => {
    const [results] = await db.query('SELECT * FROM role');
    return results as Role[];
};

export const getRoleById = async (id: number): Promise<Role[]> => {
    const [results] = await db.query('SELECT * FROM role WHERE id = ?', [id]);
    return results as Role[];
};

export const createRole = async (id: number, role: string): Promise<Role[]> => {
    const [results] = await db.query('INSERT INTO role (id, role) VALUES (?, ?)', [id, role]);
    return results as Role[];
};

export const updateRole = async (id: number, role: string): Promise<Role[]> => {
    const [results] = await db.query('UPDATE role SET role = ? WHERE id = ?', [role, id]);
    return results as Role[];
};

export const deleteRole = async (id: number): Promise<Role[]> => {
    const [results] = await db.query('DELETE FROM role WHERE id = ?', [id]);
    return results as Role[];
};