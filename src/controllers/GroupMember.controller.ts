import { Request, Response } from "express";
import { createGroupMember, deleteGroupMember, getGroupMemberById, getGroupMembers, updateGroupMember } from "../services/GroupMember.service";

export const createGroupMemberController = async (req: Request, res: Response) => {
    try {
        const {id, groupid, userid, joinedat, roleid} = req.body;
        const data = await createGroupMember(parseInt(id), parseInt(groupid), parseInt(userid), new Date(joinedat), parseInt(roleid));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getGroupMemberController = async (req: Request, res: Response) => {
    try {
        const data = await getGroupMembers();
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const getGroupMemberByIdController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await getGroupMemberById(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const updateGroupMemberController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {groupid, userid, joinedat, roleid} = req.body;
        const data = await updateGroupMember(parseInt(id), {id: parseInt(id), groupid, userid, joinedat, roleid});
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};

export const deleteGroupMemberController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const data = await deleteGroupMember(parseInt(id));
        res.json(data);
    } catch (error) {
        res.status(500).json({error});
    }
};