import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';

const router = express();

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
    router.use((req, res, next) => {
        /** Log the Request */
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}]`);
        res.on('Finish', () => {
            /**Log the Response */
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of the API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ message: 'Up and running!' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });
    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
