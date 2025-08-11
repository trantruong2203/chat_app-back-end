import { db } from "../config/db";
import { Message } from "../types/interface";

export const getAllMessages = async (): Promise<Message[]> => {
    const [results] = await db.query('SELECT id, senderid, receiverid, groupid, content, sentat, CAST(status AS UNSIGNED) as status, messageid FROM message');
    return results as Message[];
};

export const getMessageById = async (id: number): Promise<Message[]> => {
    const [results] = await db.query('SELECT id, senderid, receiverid, groupid, content, sentat, CAST(status AS UNSIGNED) as status, messageid FROM message WHERE id = ?', [id]);
    return results as Message[];
};

export const createMessage = async (senderid: number, receiverid: number, groupid: number | null, content: string, sentat: string, status: number, messageid: number): Promise<Message[]> => {
    const [results] = await db.query('INSERT INTO message (senderid, receiverid, groupid, content, sentat, status, messageid) VALUES (?, ?, ?, ?, ?, ?, ?)', [senderid, receiverid, groupid, content, sentat, status, messageid]);
    return results as Message[];
};

export const updateMessage = async (id: number, senderid: number, receiverid: number, groupid: number | null, content: string, sentat: string, status: number, messageid: number): Promise<Message[]> => {
    const [results] = await db.query('UPDATE message SET senderid = ?, receiverid = ?, groupid = ?, content = ?, sentat = ?, status = ?, messageid = ? WHERE id = ?', [senderid, receiverid, groupid, content, sentat, status, messageid, id]);
    return results as Message[];
};

export const deleteMessage = async (id: number): Promise<Message[]> => {
    const [results] = await db.query('DELETE FROM message WHERE id = ?', [id]);
    return results as Message[];
};

export const getLastMessagesByUserId = async (userId: number): Promise<Message[]> => {
    const [results] = await db.query(`
        SELECT m.*, cg.name AS groupname, cg.avatar AS groupavatar
FROM message m
LEFT JOIN chatgroup cg ON cg.id = m.groupid
WHERE m.id IN (
    -- Lấy id tin nhắn mới nhất cho mỗi đoạn chat (group hoặc 1-1)
    SELECT MAX(m2.id)
    FROM message m2
    WHERE 
      (m2.senderid = ? OR m2.receiverid = ? OR m2.groupid IN (
          SELECT groupid FROM groupmember WHERE userid = ?
      ))
    GROUP BY 
      CASE 
        WHEN m2.groupid IS NOT NULL THEN m2.groupid  -- group chat
        ELSE 
          -- chat riêng thì gom theo cặp user không phân biệt ai gửi ai
          CONCAT(LEAST(m2.senderid, m2.receiverid), '_', GREATEST(m2.senderid, m2.receiverid))
      END
)
ORDER BY m.sentat DESC;
    `, [userId, userId, userId]);

    return results as Message[];
};
