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