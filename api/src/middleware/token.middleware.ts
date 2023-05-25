import { NextFunction, Request, Response } from "express";
import { ERRORS, HTTP_STATUS_CODES } from '../types'
import dotenv from 'dotenv'
import safeQuery from "../routes/safe-query/safe-query";

dotenv.config()

const AUTH_API_KEY = process.env.AUTH_API_KEY

export default async (req: Request, res: Response, next: NextFunction) => {
    await safeQuery (async () => {
        if (!AUTH_API_KEY) return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: "Missing API Key" })
        const token = req.header('Authorization')
        if (!token || token !== AUTH_API_KEY) return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: ERRORS.INVALID_TOKEN })
        next()
    }, res, 'token-middleware')
}
