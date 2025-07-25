import { FriendShip } from "../types/interface";
import { db } from "../config/db";

export const getAllFriendShip = async (): Promise<FriendShip[]> => {
    const [results] = await db.query('SELECT id, userid, sentat, CAST(status AS UNSIGNED) as status FROM friendship');
    return results as FriendShip[];
};

export const getFriendShipById = async (id: number): Promise<FriendShip[]> => {
    const [results] = await db.query('SELECT * FROM friendship WHERE id = ?', [id]);
    return results as FriendShip[];
};

export const createFriendShip = async (userid: number, sentat: number, status: boolean): Promise<any> => {
    const [results] = await db.query('INSERT INTO friendship (userid, sentat, status) VALUES (?, ?, ?)', [userid, sentat, status]);
    return results;
   
};

export const updateFriendShip = async (id: number, userid: number, sentat: string, status: number): Promise<any> => {
    const [results] = await db.query('UPDATE friendship SET userid = ?, sentat = ?, status = ?  WHERE id = ?', [userid, sentat, status, id]);
    return results as FriendShip[];
};

export const deleteFriendShip = async (id: number): Promise<any> => {
    const [results] = await db.query('DELETE FROM friendship WHERE id = ?', [id]);
    return results;
};
