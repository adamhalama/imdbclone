import { NextFunction, Request, Response } from "express";
import { ERRORS, HTTP_STATUS_CODES } from '../types'
import dotenv from 'dotenv'

dotenv.config()

const AUTH_API_KEY = process.env.AUTH_API_KEY

export default (req: Request, res: Response, next: NextFunction) => {
    if (!AUTH_API_KEY) return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ data: "Missing API Key", error: ERRORS.INTERNAL_SERVER_ERROR })
    const token = req.header('Authorization')
    if (!token || token !== AUTH_API_KEY) return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: ERRORS.INVALID_TOKEN })
    next()
}
