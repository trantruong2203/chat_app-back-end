import { getAllFriendShip, getFriendShipById, createFriendShip, updateFriendShip, deleteFriendShip } from "../models/FriendShip.model";
import { FriendShip } from "../types/interface";

export const getAllFriendShips = () => {
    return new Promise((resolve, reject) => {
      getAllFriendShip()
        .then((results: any) => {
          resolve(results);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

export const getFriendShipByIdService = async (id: number): Promise<FriendShip[]> => {
    return new Promise((resolve, reject) => {
        getFriendShipById(id)
          .then((results: any) => {
            resolve(results);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
};

export const createFriendShipService = async (userid: number, sentat: number, status: boolean): Promise<any> => {
    return new Promise(async (resolve, reject) => {
       try {
        const results = await createFriendShip(userid, sentat, status);
        resolve({message: 'Friendship created successfully', data: {userid, sentat, status, id: results.insertId}});
       } catch (err) {
        reject(err);
       }
      });
};

export const updateFriendShipService = async (id: number, userid: number, sentat: string, status: number): Promise<any> => {
  console.log(`Updating friendship with ID: ${id}, UserID: ${userid}, SentAt: ${sentat}, Status: ${status}`);
    return new Promise(async (resolve, reject) => {
       try {
          await updateFriendShip(id, userid, sentat, status);
        resolve({message: `Friendship updated successfully ${id}`, data : {id, userid, sentat, status }});
       } catch (err) {
        reject(err);
       }
      });
};

export const deleteFriendShipService = async (id: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
       try {
        const results = await deleteFriendShip(id);
        resolve({message: 'Friendship deleted successfully', data: results.data.affectedRows});
       } catch (err) {
        reject(err);
       }
      });
};