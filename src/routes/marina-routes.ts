import express from 'express';
import { marinaController } from '../controllers/marina-controller';
import { checkIfUserIsLoggedIn } from '../middleware/auth-user-api-access';

const router = express.Router();

router.get('/', checkIfUserIsLoggedIn(), marinaController.getMarinas());
router.post('/', checkIfUserIsLoggedIn(), marinaController.createMarina());

export const marinaRouter = router;