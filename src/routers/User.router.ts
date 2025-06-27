import { createUserController, deleteUserController, getUserByIdController, getUsersController, updateUserController } from "../controllers/User.controller";
import { Router } from 'express';

const router = Router();

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
