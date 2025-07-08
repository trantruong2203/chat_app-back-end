import e, { NextFunction, Request, Response } from "express";
import * as UserService from '../services/User.service';
import multer from 'multer';
import cloudinary from '../config/cloudinary.config';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const data = await UserService.getAllUsers();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getUserByAccountController = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const data = await UserService.getUserByAccount(email);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received:', { email, password });
        // Kiểm tra email và password có được cung cấp không
        const data = await UserService.login(email, password);
        //    lưu token vào cookie
        res.cookie('token', data.token, {
            httpOnly: true,
            secure: false,       // ⬅️ false nếu đang chạy HTTP (localhost)
            sameSite: 'lax',     // hoặc 'none' nếu secure: true
            maxAge: 2 * 60 * 60 * 1000, // 2 giờ
        });
        res.status(200).json(data.token);
    } catch (err) {
        next(err);
    }
};

export const createUserController = async (req: Request, res: Response) => {
    const { username, password, email, phone, birthday, avatar } = req.body;
    try {
        const data = await UserService.createUser(username, password, email, phone, birthday, avatar);
        res.status(201).json(data);
    } catch (error: any) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error });
        }
    }
};

export const updateUserController = async (req: Request, res: Response) => {
    const { email } = req.params;
    const { username, birthday, gender, phone } = req.body;
  
    const updateData: any = {};
    if (username) updateData.username = username;
    if (birthday) updateData.birthday = birthday;
    if (gender) updateData.gender = gender;
    if (phone) updateData.phone = phone;  
    try {
      const result = await UserService.updateUser(email, updateData);
      res.status(200).json({ message: 'Cập nhật thành công', data: result });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

// Tạo storage cho Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chat_app_images',
    format: async () => 'jpg',
    public_id: (req: Request, file: Express.Multer.File) => uuidv4()
  } as any,
});

// Khởi tạo middleware upload
const upload = multer({ storage });

// Controller mới kết hợp upload ảnh và cập nhật thông tin
export const updateUserWithAvatarController = upload.single('avatar');

export const processUserUpdate = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { username, birthday, gender, phone } = req.body;

  const updateData: any = {};
  if (username) updateData.username = username;
  if (birthday) updateData.birthday = birthday;
  if (gender) updateData.gender = gender;
  if (phone) updateData.phone = phone;
  
  // Xử lý avatar nếu có
  if (req.file && req.file.path) {
    updateData.avatar = req.file.path;
  }

  try {
    const result = await UserService.updateUser(email, updateData);
    res.status(200).json({ 
      message: 'Cập nhật thành công', 
      data: result,
      avatar: req.file ? req.file.path : undefined
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const data = await UserService.deleteUser(email);
        res.status(204).send();
    } catch (error: any) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error });
        }
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        res.json({ user: req.user }); // lấy từ decoded token
    } catch (error) {
        res.status(500).json({ message: 'Lỗi hệ thống' });
    }
};

export const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'Đăng xuất thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi hệ thống khi đăng xuất' });
    }
};




