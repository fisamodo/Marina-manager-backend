import express from 'express';
import { userController } from '../controllers/user-controller';

const router = express.Router();

router.post('/', userController.registerUser());

export const userRouter = router;
