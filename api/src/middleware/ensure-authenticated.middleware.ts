import { NextFunction, Request, Response } from "express";
import safeQuery from "../routes/safe-query/safe-query";
import client from "../repository/client/client";
import { HTTP_STATUS_CODES } from "../types";

export default async (req: Request, res: Response, next: NextFunction) => {
    await safeQuery(async () => {
        const auth = req.header('ensure-auth')
        if (!auth) return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: 'Authentication not successful' })
        const [token, email] = auth.split(' ')
        if (!email || !token) if (!auth) return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: 'Authentication not successful' })
        const user = await client.user.findFirst({
            where: {
                email,
                token
            }
        })
        if (!user) return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: 'Authentication not successful' })
    }, res, 'ensure-auth')
    next()
}