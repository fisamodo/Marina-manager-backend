import { asyncMiddleware } from '../middleware/async-middleware';
import { Request, Response } from 'express';
import { userRepository } from '../modules/user/user-repository';
import bcrypt from 'bcrypt';

export class UserController {
    registerUser() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { firstName, lastName, email, password } = req.body;
                const user = await userRepository.findOne({ email: email });
                if (user) {
                    return res.status(409).send({ message: 'User with given email already exists' });
                }
                const salt = await bcrypt.genSalt(Number(process.env.SALT));
                const hashPassowrd = await bcrypt.hash(password, salt);

                const newUser = await userRepository.create({ firstName, lastName, email, password: hashPassowrd });
                return res.status(201).send(newUser);
            } catch (error) {
                return res.status(400).send({ message: 'Bad request' });
            }
        });
    }
}

export const userController = new UserController();
