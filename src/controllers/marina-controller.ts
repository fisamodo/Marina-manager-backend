import { asyncMiddleware } from '../middleware/async-middleware';
import { Request, Response } from 'express';
import { IMarina } from '../modules/marina/marina-model';
import { marinaRepository } from '../modules/marina/marina-repository';

export class MarinaController {
    getMarinas() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const marinas: IMarina[] = await marinaRepository.find({});
                return res.status(200).send(marinas);
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }

    createMarina() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { marina } = req.body;
                const marinaData = await marinaRepository.create(marina);
                return res.status(200).send(marinaData);
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}

export const marinaController = new MarinaController();
