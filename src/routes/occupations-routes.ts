import express from 'express';
import { occupationsController } from '../controllers/occupations-controller';
import { checkIfUserIsLoggedIn } from '../middleware/auth-user-api-access';
import { checkIfMarinaOccupationCreationIsPossible } from '../middleware/check-if-marina-occupation-creation-is-possible';

const router = express.Router();
router.get('/:marinaId', checkIfUserIsLoggedIn(), occupationsController.getAllOccupationsForMarina());

router.post('/', checkIfUserIsLoggedIn(), checkIfMarinaOccupationCreationIsPossible(), occupationsController.createOccupation());

export const occupationRouter = router;
