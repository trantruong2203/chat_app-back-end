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
    groupid: number | null;
    content: string;
    sentat: string;
    status: number;
    messageid: number;
};

export interface ChatGroup {
    id: number;
    name: string;
    avatar: string;
    creatorid: number;
    createdat: Date;
    status: number;
};

export interface GroupMember {
    id: number;
    groupid: number;
    userid: number;
    joinedat: string;
    roleid: number;
};

export interface Post {
    id: number;
    userid: number;
    content: string;
    createdat: Date;
    status: number;
};

export interface FavoritePost {
    id: number;
    userid: number;
    postid: number;
    createdat: Date;
    iconid: number;
};

export interface PostImage {
    id: number;
    postid: number;
    imgurl: string;
};

export interface Comment {
    id: number;
    userid: number;
    postid: number;
    content: string;
    iconid: number;
    imageurl: string;
    commentid: number;
    createdat: Date;
};

export interface MessageSocket {
    id: number;
    senderid: number;
    receiverid: number;
    groupid: number | null;
    content: string;
    sentat: string;
    status: number;
    messageid: number;
};