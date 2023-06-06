import { userRepository } from '../modules/user/user-repository';
import { asyncMiddleware } from './async-middleware';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { marinaRepository } from '../modules/marina/marina-repository';
import { marinaService } from '../modules/marina/marina-service';
import { IOccupations } from '../modules/occupations/occupations-model';
import { occupationsRepository } from '../modules/occupations/occupations-repository';
import { occupationsService } from '../modules/occupations/occupations-service';

export function checkIfMarinaOccupationCreationIsPossible() {
    return asyncMiddleware(async (req: Request, res: Response) => {
        try {
            const { occupation } = req.body;
            const marina = await marinaRepository.findById(occupation.marinaId);
            const occupations = await occupationsRepository.find({ marinaId: marina?._id });
            const occupancy = marinaService.calculateOccupancyForMarina(occupations, marina, false);
            const currentOccupancyState = occupationsService.checkIfOccupationIsPossible(marina, occupancy, occupation);

            if (currentOccupancyState.amount === currentOccupancyState.maxAmount) {
                throw new Error('Marina occupation is not available for current entry');
            }
        } catch (error) {
            throw new Error('Marina occupation is not available for current entry');
        }
    });
}
