import request from 'supertest';
import app from '../../app';
import { HTTP_STATUS_CODES } from '../../types';
import { USER_VALIDATION_ERRORS } from './user.validate';
import * as tokenMiddleware from '../../middleware/token.middleware'
import * as authMiddleware from '../../middleware/ensure-authenticated.middleware'
import { NextFunction, Request, Response } from 'express';

jest.mock('../../repository/user/user.repository')
jest.mock('../../middleware/ensure-authenticated.middleware.ts')
jest.mock('../../middleware/token.middleware.ts')

beforeAll(() => {
    jest.spyOn(tokenMiddleware, 'default').mockImplementation(async (_: Request, __: Response, next: NextFunction) => next())
    jest.spyOn(authMiddleware, 'default').mockImplementation(async (_: Request, __: Response, next: NextFunction) => next())
})

const BASE_PATH = '/user'

describe('user', () => {

    describe('register', () => {

        const validRegister = {
            email: 'test@gmail.com',
            username: 'test',
            password: 'test1234',
            confirmPassword: 'test1234'
        }

        const PATH = `${BASE_PATH}/register`

        it('should not allow invalid email', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validRegister,
                    email: '1234'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: USER_VALIDATION_ERRORS.INVALID_EMAIL })
        })

        it('should not allow invalid username', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validRegister,
                    username: '1'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: USER_VALIDATION_ERRORS.INVALID_USERNAME })
        })

        it('should not allow invalid username', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validRegister,
                    username: '8214782471209002347401'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: USER_VALIDATION_ERRORS.INVALID_USERNAME })
        })

        it('should not allow invalid password', async () => {
            const { body, status } = await request(app)
                .post(PATH)
                .send({
                    ...validRegister,
                    password: '1234'
                })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: USER_VALIDATION_ERRORS.INVALID_PASSWORD })
        })

        it('should not allow invalid passwords', async () => {
            const { body, status } = await request(app)
            .post(PATH)
            .send({
                ...validRegister,
                password: '821478247120821478247120821478247120821478247120821478247120821478247120821478247120821478247120821478247120821478247120821478247120'
            })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: USER_VALIDATION_ERRORS.INVALID_PASSWORD })
        })

        it('should not allow not matching passwords', async () => {
            const { body, status } = await request(app)
            .post(PATH)
            .send({
                ...validRegister,
                confirmPassword: 'test1235'
            })
            expect(status).toBe(HTTP_STATUS_CODES.BAD_REQUEST)
            expect(body).toEqual({ data: null, error: USER_VALIDATION_ERRORS.NOT_MATCHING_PASSWORDS })
        })
    })
})