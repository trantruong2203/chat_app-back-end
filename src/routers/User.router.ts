import { createUserController, deleteUserController, getCurrentUser, getUsersController, loginController, logoutController, processUserUpdate, updateUserController, updateUserWithAvatarController } from "../controllers/User.controller";
import { Router } from 'express';
import { authMiddleware } from "../middlewares/auth.middlewares";
import { uploadAvatar } from "../controllers/Cloudinary.controller";

const router = Router();

// Route không cần xác thực
router.post('/login', loginController);
router.post('/register', createUserController);

// Áp dụng middleware auth cho tất cả route dưới đây
router.use(authMiddleware);

// Route cần xác thực
router.get('/', getUsersController);
router.get('/me', getCurrentUser);
router.patch('/update/:email', updateUserController);
router.delete('/delete/:email', deleteUserController);
router.post('/logout', logoutController);
router.post('/upload-avatar', uploadAvatar);

// API mới kết hợp cập nhật thông tin và upload avatar
router.patch('/update-with-avatar/:email', updateUserWithAvatarController, processUserUpdate);

export default router;