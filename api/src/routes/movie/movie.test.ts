import request from 'supertest';
import app from '../../app';
import { HTTP_STATUS_CODES } from '../../types';
import { COMMENT_VALIDATION_ERRORS, RATING_VALIDATION_ERRORS } from './movie.validate'
import * as tokenMiddleware from '../../middleware/token.middleware'
import * as authMiddleware from '../../middleware/ensure-authenticated.middleware'
import { NextFunction, Request, Response } from 'express';

jest.mock('../../repository/movie/movie.repository')
jest.mock('../../middleware/ensure-authenticated.middleware.ts')
jest.mock('../../middleware/token.middleware.ts')

beforeAll(() => {
    jest.spyOn(tokenMiddleware, 'default').mockImplementation(async (_: Request, __: Response, next: NextFunction) => next())
    jest.spyOn(authMiddleware, 'default').mockImplementation(async (_: Request, __: Response, next: NextFunction) => next())
})

const BASE_PATH = '/movie'

describe('movie', () => {

    describe('comment', () => {

        const validComment = {
            text: 'This is a fine comment.',
            username: 'Joost Klein',
            date: '10-10-2023',
            movieId: 1
        }

        const PATH = `${BASE_PATH}/comment`

        it('should not allow comment with invalid text', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validComment,
                    text: '1'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: COMMENT_VALIDATION_ERRORS.INVALID_COMMENT })
        })

        it('should not allow comment with invalid text', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validComment,
                    text: '123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241123128372147810241'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: COMMENT_VALIDATION_ERRORS.INVALID_COMMENT })
        })

        it('should not allow comment with invalid date', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validComment,
                    date: '27-19-3'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: COMMENT_VALIDATION_ERRORS.INVALID_DATE })
        })

        it('should not allow comment with invalid date', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validComment,
                    date: 'F'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: COMMENT_VALIDATION_ERRORS.INVALID_DATE })
        })

    })

    describe('rating', () => {

        const validRating = {
            points: 3,
            username: 'John Doe',
            movieId: 1
        }

        const PATH = `${BASE_PATH}/rating`

        it('should not allow invalid rating', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validRating,
                    points: -1
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: RATING_VALIDATION_ERRORS.INVALID_RATING })
        })

        it('should not allow invalid rating', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validRating,
                    points: 7
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: RATING_VALIDATION_ERRORS.INVALID_RATING })
        })
    })
})