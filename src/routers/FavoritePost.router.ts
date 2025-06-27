import { Router } from "express";
import { getFavoritePostsController, getFavoritePostByIdController, createFavoritePostController, updateFavoritePostController, deleteFavoritePostController } from "../controllers/FavoritePost.controller";

const router = Router();

router.get('/', getFavoritePostsController);
router.get('/:id', getFavoritePostByIdController);
router.post('/', createFavoritePostController);
router.put('/:id', updateFavoritePostController);
router.delete('/:id', deleteFavoritePostController);

export default router;