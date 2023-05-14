import { asyncMiddleware } from '../middleware/async-middleware';
import { Request, Response } from 'express';
import { IMarina } from '../modules/marina/marina-model';
import { marinaRepository } from '../modules/marina/marina-repository';
import { occupationsRepository } from '../modules/occupations/occupations-repository';
import { occupationsService } from '../modules/occupations/occupations-service';

export class OccupationsController {
    getAllOccupationsForMarina() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { marinaId } = req.params;
                console.log(marinaId);
                return res.status(200).send({});
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }

    createOccupation() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { occupation } = req.body;

                const boatType = occupationsService.extractBoatTypeFromDropdownOption(occupation.boatType);
                const occupationData = {
                    registrationNumber: occupation.registrationNumber,
                    isUsingElectricPort: occupation.isUsingElectricPort,
                    isUsingWaterPort: occupation.isUsingWaterPort,
                    marinaId: occupation.marinaId,
                    boatType
                };
                const newOccupation = await occupationsRepository.create(occupationData);
                return res.status(200).send(newOccupation);
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}

export const occupationsController = new OccupationsController();
