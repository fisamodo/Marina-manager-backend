import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import { userRouter } from './routes/user-routes';
import cookieParser from 'cookie-parser';
import { marinaRouter } from './routes/marina-routes';
import { occupationRouter } from './routes/occupations-routes';

const cors = require('cors');
const app = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('Connected');
        startServer();
    })
    .catch((error) => {
        Logging.error('Error');
        Logging.error(error);
    });

const startServer = () => {
    app.use((req, res, next) => {
        /** Log the Request */
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}]`);
        res.on('Finish', () => {
            /**Log the Response */
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ credentials: true, origin: true }));
    app.use(cookieParser());

    /** Rules of the API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */

    app.use('/api/users', userRouter);
    app.use('/api/marinas', marinaRouter);
    app.use('/api/occupations', occupationRouter);
    /** Healthcheck */
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'Up and running!' }));

    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });
    http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
