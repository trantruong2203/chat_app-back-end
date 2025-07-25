import { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage } from "../models/Message.model";
import { Message } from "../types/interface";

export const getAllMessagesService = () => {
    return new Promise((resolve, reject) => {
      getAllMessages()
        .then((results: any) => {
          resolve(results);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  };

export const getMessageByIdService = async (id: number): Promise<Message[]> => {
    return new Promise((resolve, reject) => {
        getMessageById(id)
          .then((results: any) => {
            resolve(results);
          })
          .catch((err: any) => {
            reject(err);
          });
      });
};

export const createMessageService = async (senderid: number, receiverid: number, groupid: number, content: string, sentat: Date, status: boolean, messageid: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
       try {
        const results = await createMessage(senderid, receiverid, groupid, content, sentat, status, messageid);
        resolve({message: 'Message created successfully', data: {senderid, receiverid, groupid, content, sentat, status, messageid}});
       } catch (err) {
        reject(err);
       }
      });
};

export const updateMessageService = async (id: number, senderid: number, receiverid: number, groupid: number, content: string, sentat: Date, status: boolean, messageid: number): Promise<any> => {
  console.log(`Updating message with ID: ${id}, SenderID: ${senderid}, ReceiverID: ${receiverid}, GroupID: ${groupid}, Content: ${content}, SentAt: ${sentat}, Status: ${status}, MessageID: ${messageid}`);
    return new Promise(async (resolve, reject) => {
       try {
          await updateMessage(id, senderid, receiverid, groupid, content, sentat, status, messageid);
        resolve({message: `Message updated successfully ${id}`, data : {id, senderid, receiverid, groupid, content, sentat, status, messageid}});
       } catch (err) {
        reject(err);
       }
      });
};

export const deleteMessageService = async (id: number): Promise<any> => {
    return new Promise(async (resolve, reject) => {
       try {
        await deleteMessage(id);
        resolve({message: 'Message deleted successfully', data: {id}});
       } catch (err) {
        reject(err);
       }
      });
};