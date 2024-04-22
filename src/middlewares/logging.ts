import { Request, Response, NextFunction } from 'express';

export function logRequest(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`${method} ${url} ${time}`);
    next();
}

export function logUserRequest(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.url;
    const time = new Date().toISOString();
    console.log(`[USER] ${method} ${url} ${time}`);
    next();
}
