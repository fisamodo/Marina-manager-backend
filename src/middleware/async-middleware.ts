import { NextFunction, Request, Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const asyncMiddleware = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res)
        .then(() => next)
        .catch(next)
        .finally(() => {
            if (!res.headersSent) {
                next();
            }
        });
};
