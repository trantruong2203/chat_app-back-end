import { Icon } from "../models/Icon.model";
import { db } from '../config/db';

export const getAllIcons = async () : Promise<Icon[]> => {
    const [results] = await db.query('SELECT * FROM icon');
    return results as Icon[];
};

export const getIconById = async (id: number): Promise<Icon[]> => {
  const [results] = await db.query('SELECT * FROM icon WHERE id = ?', [id]);
  return results as Icon[];
};

export const createIcon = async (id: number, icon: string, status: boolean) : Promise<Icon[]> => {
  const [results] = await db.query('INSERT INTO icon (id, icon, status) VALUES (?, ?, ?)', [id, icon, status]);
  return results as Icon[];
};

  export const updateIcon = async (id: number, icon: string, status: boolean) : Promise<Icon[]> => {
  const [results] = await db.query('UPDATE icon SET icon = ?, status = ? WHERE id = ?', [icon, status, id]);
  return results as Icon[];
};

export const deleteIcon = async (id: number) : Promise<Icon[]> => {
  const [results] = await db.query('DELETE FROM icon WHERE id = ?', [id]);
  return results as Icon[];
};

export const getIconByStatus = async (status: boolean) : Promise<Icon[]> => {
  const [results] = await db.query('SELECT * FROM icon WHERE status = ?', [status]);
  return results as Icon[];
};

export const getIconByIcon = async (icon: string) => {
  const [results] = await db.query('SELECT * FROM icon WHERE icon = ?', [icon]);
  return results as Icon[];
};