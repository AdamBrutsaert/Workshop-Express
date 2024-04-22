import { Request, Response, NextFunction } from 'express';

export function handleInternalErrors(err: unknown, req: Request, res: Response, next: NextFunction) {
    res.status(500).send();
};
