import { createUserController, deleteUserController, getUsersController, loginController, updateUserController } from "../controllers/User.controller";
import { Router } from 'express';

const router = Router();

router.get('/', getUsersController);
router.post('/login', loginController);
router.post('/register', createUserController);
router.put('/update/:username', updateUserController);
router.delete('/delete/:username', deleteUserController);

export default router;


// orm  => all , lay theo id , them mới, sửa, xóa , phan trang 