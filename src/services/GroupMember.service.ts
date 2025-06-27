import { GroupMember } from "../models/GroupMember.model";
import { db } from "../config/db";

export const createGroupMember = async (id: number, groupid: number, userid: number, joinedat: Date, roleid: number): Promise<GroupMember[]> => {
    const newGroupMember = await db.query('INSERT INTO groupmember (id, groupid, userid, joinedat, roleid) VALUES (?, ?, ?, ?, ?)', [id, groupid, userid, joinedat, roleid]);
    return newGroupMember as unknown as GroupMember[];
};

export const getGroupMemberById = async (id: number): Promise<GroupMember[]> => {
    const [results] = await db.query('SELECT * FROM groupmember WHERE id = ?', [id]);
    return results as unknown as GroupMember[];
};

export const getGroupMembers = async (): Promise<GroupMember[]> => {
    const [results] = await db.query('SELECT * FROM groupmember');
    return results as unknown as GroupMember[];
};

export const updateGroupMember = async (id: number, groupMember: GroupMember): Promise<GroupMember[]> => {
    const [results] = await db.query('UPDATE groupmember SET groupid = ?, userid = ?, joinedat = ?, roleid = ? WHERE id = ?', [groupMember.groupid, groupMember.userid, groupMember.joinedat, groupMember.roleid, id]);
    return results as unknown as GroupMember[];
};

export const deleteGroupMember = async (id: number): Promise<GroupMember[]> => {
    const [results] = await db.query('DELETE FROM groupmember WHERE id = ?', [id]);
    return results as unknown as GroupMember[];
};