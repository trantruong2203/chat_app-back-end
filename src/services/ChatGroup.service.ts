import { ChatGroup } from "../models/ChatGroup.modle";
import { db } from "../config/db";

export const getAllChatGroups = async (): Promise<ChatGroup[]> => {
    const [results] = await db.query('SELECT * FROM chatgroup');
    return results as ChatGroup[];
};

export const getChatGroupById = async (id: number): Promise<ChatGroup[]> => {
    const [results] = await db.query('SELECT * FROM chatgroup WHERE id = ?', [id]);
    return results as ChatGroup[];
};

export const createChatGroup = async (id: number, name: string, avatar: string, creatorid: number, createdat: Date, status: boolean): Promise<ChatGroup[]> => {
    const [results] = await db.query('INSERT INTO chatgroup (id, name, avatar, creatorid, createdat, status) VALUES (?, ?, ?, ?, ?, ?)', [id, name, avatar, creatorid, createdat, status]);
    return results as ChatGroup[];
};

export const updateChatGroup = async (id: number, name: string, avatar: string, creatorid: number, createdat: Date, status: boolean): Promise<ChatGroup[]> => {
    const [results] = await db.query('UPDATE chatgroup SET name = ?, avatar = ?, creatorid = ?, createdat = ?, status = ? WHERE id = ?', [name, avatar, creatorid, createdat, status, id]);
    return results as ChatGroup[];
};

export const deleteChatGroup = async (id: number): Promise<ChatGroup[]> => {
    const [results] = await db.query('DELETE FROM chatgroup WHERE id = ?', [id]);
    return results as ChatGroup[];
};