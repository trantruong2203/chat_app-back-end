import { FriendShip } from "../models/FriendShip.model";
import { db } from "../config/db";

export const getAllFriendShips = async (): Promise<FriendShip[]> => {
    const [results] = await db.query('SELECT * FROM friendship');
    return results as FriendShip[];
};

export const getFriendShipById = async (id: number): Promise<FriendShip[]> => {
    const [results] = await db.query('SELECT * FROM friendship WHERE id = ?', [id]);
    return results as FriendShip[];
};

export const createFriendShip = async (id: number, userid: number, sentat: Date, status: boolean): Promise<FriendShip[]> => {
    const [results] = await db.query('INSERT INTO friendship (id, userid, sentat, status) VALUES (?, ?, ?, ?)', [id, userid, sentat, status]);
    return results as FriendShip[];
};

export const updateFriendShip = async (id: number, userid: number, sentat: Date, status: boolean): Promise<FriendShip[]> => {
    const [results] = await db.query('UPDATE friendship SET userid = ?, sentat = ?, status = ? WHERE id = ?', [userid, sentat, status, id]);
    return results as FriendShip[];
};

export const deleteFriendShip = async (id: number): Promise<FriendShip[]> => {
    const [results] = await db.query('DELETE FROM friendship WHERE id = ?', [id]);
    return results as FriendShip[];
};