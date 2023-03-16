import { userRepository } from '../modules/user/user-repository';
import { asyncMiddleware } from './async-middleware';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function allowSignedInUsers() {
    return asyncMiddleware(async (req: Request, res: Response) => {
        try {
            const { cookie } = req.cookies;
            const { _id } = jwt.verify(cookie, 'privatekey') as any; //extract to env

            const user = await userRepository.findOne({ _id: _id });
            if (!user) {
                res.clearCookie('token');
                throw new Error('Unauthorized user');
            }
        } catch (error) {
            throw new Error('Unauthorized user');
        }
    });
}
