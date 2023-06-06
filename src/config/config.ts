import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.n15qy5g.mongodb.net/`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
const SERVER_URL = process.env.SERVER_URL ?? 'localhost';
const CLIENT_URL = process.env.CLIENT_URL ?? 'http://localhost:3000';
const JWT_KEY = process.env.JWT_KEY ?? 'privatekey';

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        domain: SERVER_URL,
        port: SERVER_PORT
    },
    client: {
        url: CLIENT_URL
    },
    jwt: {
        key: JWT_KEY
    }
};
