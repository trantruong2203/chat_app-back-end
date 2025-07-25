import { db } from "../config/db";
import { FriendShip, Message } from "../types/interface";

export const getAllMessages = async (): Promise<Message[]> => {
    const [results] = await db.query('SELECT id, senderid, receiverid, groupid, content, sentat, CAST(status AS UNSIGNED) as status, messageid FROM message');
    return results as Message[];
};  

export const getMessageById = async (id: number): Promise<Message[]> => {
    const [results] = await db.query('SELECT id, senderid, receiverid, groupid, content, sentat, CAST(status AS UNSIGNED) as status, messageid FROM message WHERE id = ?', [id]);
    return results as Message[];
};

export const createMessage = async (senderid: number, receiverid: number, groupid: number, content: string, sentat: Date, status: boolean, messageid: number): Promise<Message[]> => {
    const [results] = await db.query('INSERT INTO message (senderid, receiverid, groupid, content, sentat, status, messageid) VALUES (?, ?, ?, ?, ?, ?, ?)', [senderid, receiverid, groupid, content, sentat, status, messageid]);
    return results as Message[];
};

export const updateMessage = async (id: number, senderid: number, receiverid: number, groupid: number, content: string, sentat: Date, status: boolean, messageid: number): Promise<Message[]> => {
    const [results] = await db.query('UPDATE message SET senderid = ?, receiverid = ?, groupid = ?, content = ?, sentat = ?, status = ?, messageid = ? WHERE id = ?', [senderid, receiverid, groupid, content, sentat, status, messageid, id]);
    return results as Message[];
};

export const deleteMessage = async (id: number): Promise<Message[]> => {
    const [results] = await db.query('DELETE FROM message WHERE id = ?', [id]);
    return results as Message[];
};
