import express from 'express';
import { marinaController } from '../controllers/marina-controller';
import { checkIfUserIsLoggedIn } from '../middleware/auth-user-api-access';

const router = express.Router();

router.get('/', checkIfUserIsLoggedIn(), marinaController.getMarinas());
router.post('/', checkIfUserIsLoggedIn(), marinaController.createMarina());
router.patch('/', checkIfUserIsLoggedIn(), marinaController.editMarina());

router.get('/occupancy/:marinaId', checkIfUserIsLoggedIn(), marinaController.getMarinaWithCurrentOccupancy());
router.get('/:marinaId', checkIfUserIsLoggedIn(), marinaController.getMarina());

export const marinaRouter = router;
