import express from 'express';
import { userController } from '../controllers/user-controller';
import { allowSignedInUsers } from '../middleware/auth-user-api-access';

const router = express.Router();

router.post('/login', userController.loginUser());
router.post('/logout', userController.logout());
router.post('/register', userController.registerUser());
router.get('/verify', userController.verifyUser());

export const userRouter = router;
