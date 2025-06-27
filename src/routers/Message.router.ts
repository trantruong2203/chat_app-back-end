import { Router } from "express";
import { getAllMessagesController, getMessageByIdController, createMessageController, updateMessageController, deleteMessageController } from "../controllers/Message.controller";

const router = Router();

router.get('/', getAllMessagesController);
router.get('/:id', getMessageByIdController);
router.post('/', createMessageController);
router.put('/:id', updateMessageController);
router.delete('/:id', deleteMessageController);

export default router;