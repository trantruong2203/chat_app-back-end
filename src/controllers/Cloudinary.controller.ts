
import multer from 'multer';
import cloudinary from '../config/cloudinary.config';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request, Response } from 'express';

interface CloudinaryParams {
  folder: string;
  format: (req: Request, file: Express.Multer.File) => string | Promise<string>;
  public_id: (req: Request, file: Express.Multer.File) => string;
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chat_app_images',
    format: async () => 'jpg',
    public_id: (req: Request, file: Express.Multer.File) => uuidv4()
  } as CloudinaryParams,
});

const upload = multer({ storage });

export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
  if (!req.file || !req.file.path) {
    res.status(400).json({ error: 'Không có ảnh nào được tải lên' });
    return;
  }

  res.status(200).json({ url: req.file.path });
}
