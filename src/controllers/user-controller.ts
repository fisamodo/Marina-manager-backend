import { asyncMiddleware } from '../middleware/async-middleware';
import { Request, Response } from 'express';
import { userRepository } from '../modules/user/user-repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    loginUser() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                const user = await userRepository.findOne({ email: email });
                if (!user) {
                    return res.status(401).send({ message: 'Invalid Email or Password' });
                }
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return res.status(401).send({ message: 'Invalid Email or Password' });
                }
                const token = jwt.sign({ _id: user._id.toString() }, 'privatekey', { expiresIn: '7d' });
                return res.status(200).send({ data: token, message: 'Logged in succesfully' });
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}

export const userController = new UserController();
