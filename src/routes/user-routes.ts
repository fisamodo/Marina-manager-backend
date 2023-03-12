import express from 'express';
import { userController } from '../controllers/user-controller';

const router = express.Router();

router.post('/', userController.registerUser());
router.post('/login', userController.loginUser());
router.post('/:id?', userController.verifyUser());

export const userRouter = router;
