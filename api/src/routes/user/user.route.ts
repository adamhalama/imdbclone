import { Request, Response, Router } from "express";
import safeQuery from "../safe-query/safe-query";
import * as repo from '../../repository/user/user.repository'
import * as validate from './user.validate'
import ensureAuthenticatedMiddleware from "../../middleware/ensure-authenticated.middleware";
import { HTTP_STATUS_CODES } from "../../types";

const PATH = 'user'

const login = async (req: Request, res: Response) => {
    await safeQuery(async () => {
       const { email, password } = req.body
       const error = validate.login(email)
       if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const user = await repo.login(email, password)
        if (user) return res.status(HTTP_STATUS_CODES.OK).json({ data: { 
            username: user.username, 
            email: user.email, 
            token: user.token, 
            friends: repo.mapFriends(user.friends), 
            toplist: user.toplist 
        }, error: null })
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ data: null, error: validate.USER_VALIDATION_ERRORS.INVALID_CREDENTIALS })
   }, res, `${PATH}/login`)
}

const register = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { username, email, password, confirmPassword } = req.body
        const error = validate.register(username, email, password, confirmPassword)
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const { error: dbError } = await repo.register(email, username, password)
        if (dbError) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error: dbError })
        return res.status(HTTP_STATUS_CODES.OK).json({ data: null, error: null })
    }, res, `${PATH}/register`)
}
    
const addFriend = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { adder, added } = req.body
        const error = validate.friends(adder, added)
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const result = await repo.addFriend(adder, added)
        if (typeof result === 'string') return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error: result })
        return res.status(HTTP_STATUS_CODES.OK).json({ data: repo.mapFriends(result.friends), error: null })
    }, res, `${PATH}/friend/add`)
}

const removeFriend = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { remover, removed } = req.body
        const error = validate.friends(remover, removed)
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const result = await repo.removeFriend(remover, removed)
        if (typeof result === 'string') return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error: result })
        return res.status(HTTP_STATUS_CODES.OK).json({ data: repo.mapFriends(result.friends), error: null })
    }, res, `${PATH}/friend/remove`)
}

const deleteAccount = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { email } = req.body
        const error = validate.deleteAccount(email)
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        await repo.deleteAccount(email)
        return res.status(HTTP_STATUS_CODES.OK).json({ data: null, error: null })
    }, res, `${PATH}/delete-account`)
}

const changePassword = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { email, currentPassword, newPassword, confirmNewPassword } = req.body
        const error = validate.changePassword(email, currentPassword, newPassword, confirmNewPassword)
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const { error: dbError } = await repo.changePassword(email, currentPassword, newPassword)
        if (dbError) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error: dbError })
        return res.status(HTTP_STATUS_CODES.OK).json({ data: null, error: null })
    }, res, `${PATH}/password`)
}

const changeUsername = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { email, username } = req.body
        const error = validate.changeUsername(email, username)
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const { error: dbError } = await repo.changeUsername(email, username)
        if (dbError) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error: dbError })
        return res.status(HTTP_STATUS_CODES.OK).json({ data: null, error: null })
    }, res, `${PATH}/username`)
}

const toplist = async (req: Request, res: Response) => {
    await safeQuery(async () => {
        const { email, movieId } = req.body
        const error = validate.toplist(email)  
        if (error) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error })
        const { error: dbError } = await repo.toplist(email, parseInt(movieId))
        if (dbError) return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ data: null, error: dbError })
        return res.status(HTTP_STATUS_CODES.OK).json({ data: null, error: null })
    }, res, `${PATH}/toplist`)
}

export const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.put('/friend/add', (req, res, next) => ensureAuthenticatedMiddleware(req, res, next), addFriend)
userRouter.put('/friend/remove',(req, res, next) => ensureAuthenticatedMiddleware(req, res, next), removeFriend)
userRouter.put('/username',(req, res, next) => ensureAuthenticatedMiddleware(req, res, next), changeUsername)
userRouter.put('/password',(req, res, next) => ensureAuthenticatedMiddleware(req, res, next), changePassword)
userRouter.put('/toplist', (req, res, next) => ensureAuthenticatedMiddleware(req, res, next), toplist)
userRouter.delete('/', (req, res, next) => ensureAuthenticatedMiddleware(req, res, next), deleteAccount)