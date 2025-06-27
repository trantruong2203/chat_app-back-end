import { Router } from 'express';
import { getFriendShipByIdController, createFriendShipController, updateFriendShipController, deleteFriendShipController, getFriendShipsController } from '../controllers/FriendShip.controller';

const router = Router();

router.get('/', getFriendShipsController);
router.get('/:id', getFriendShipByIdController);
router.post('/', createFriendShipController);
router.put('/:id', updateFriendShipController);
router.delete('/:id', deleteFriendShipController);

export default router;