import { userRepository } from '../modules/user/user-repository';
import { asyncMiddleware } from './async-middleware';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export function checkIfUserIsLoggedIn() {
    return asyncMiddleware(async (req: Request, res: Response) => {
        try {
            const { token } = req.cookies;
            const { _id } = jwt.verify(token, 'privatekey') as any; //extract to env
            const user = await userRepository.findOne({ _id: _id });
            console.log('user: ', user);
            if (!user) {
                res.clearCookie('token');
                throw new Error('Unauthorized user');
            }
        } catch (error) {
            throw new Error('Unauthorized user');
        }
    });
}
