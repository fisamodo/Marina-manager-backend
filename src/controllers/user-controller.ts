import { asyncMiddleware } from '../middleware/async-middleware';
import { Request, Response } from 'express';
import { userRepository } from '../modules/user/user-repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../modules/user/user-model';
import { config } from './../config/config';
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
                const token = jwt.sign({ _id: user._id.toString() }, 'privatekey', { expiresIn: '7d' }); //extract to env
                res.cookie('token', token, { maxAge: 3000 * 3000, httpOnly: true, secure: true });
                return res.status(200).send(user);
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }

    verifyUser() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { token } = req.cookies;
                if (token) {
                    const { _id } = jwt.verify(token, 'privatekey') as any; //extract to env
                    const user = await userRepository.findOne({ _id: _id });

                    if (!user) {
                        return res.status(401).send({ data: { token, user: {} }, message: 'User is invalid' });
                    }
                    return res.status(200).send({ data: { token, user }, message: 'Valid user' });
                }
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }

    logout() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const { token } = req.cookies;
                if (token) {
                    const { _id } = jwt.verify(token, 'privatekey') as any; //extract to env
                    const user = await userRepository.findOne({ _id: _id });
                    if (!user) {
                        return res.status(401).send({ data: { token, user: {} }, message: 'User is invalid' });
                    }
                    res.cookie('token', '', { expires: new Date(0) });
                    return res.status(200).send({ data: _id, message: 'Logged out succesfully' });
                }
                return res.status(200).send({ data: { token }, message: 'User is logged out' });
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }

    getAllUsers() {
        return asyncMiddleware(async (req: Request, res: Response) => {
            try {
                const users: IUser[] = await userRepository.find({});

                return res.status(200).send(users);
            } catch (error) {
                return res.status(500).send({ message: 'Internal server error' });
            }
        });
    }
}

export const userController = new UserController();
