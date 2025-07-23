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