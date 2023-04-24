import express from 'express';
import { userController } from '../controllers/user-controller';
import { checkIfUserIsLoggedIn } from '../middleware/auth-user-api-access';

const router = express.Router();

router.post('/login', userController.loginUser());
router.post('/logout', userController.logout());
router.post('/register', userController.registerUser());
router.get('/verify', userController.verifyUser());
router.get('/all-users', checkIfUserIsLoggedIn(), userController.getAllUsers());
router.post('/promote-depromote-user-type/:id', checkIfUserIsLoggedIn(), userController.promoteDepromoteUserType());

export const userRouter = router;
