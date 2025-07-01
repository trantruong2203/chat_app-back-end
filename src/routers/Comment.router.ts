import { RequestHandler, Router } from "express";
import { getCommentsController, createCommentController, updateCommentController, deleteCommentController, getCommentByIdController } from "../controllers/Comment.controller";

const router = Router();

router.get('/', getCommentsController);
router.get('/:id', getCommentByIdController as RequestHandler);
router.post('/', createCommentController);
router.put('/:id', updateCommentController);
router.delete('/:id', deleteCommentController);

export default router;