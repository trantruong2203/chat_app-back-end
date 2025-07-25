export interface FriendShip {
    id: number;
    userid: number;
    sentat: number;
    status: number;
};

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

export interface Message {
    id: number;
    senderid: number;
    receiverid: number;
    groupid: number;
    content: string;
    sentat: Date;
    status: boolean;
    messageid: number;
}