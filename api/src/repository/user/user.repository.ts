import { Movie, User } from "@prisma/client"
import client from "../client/client"
import CryptoJS from "crypto-js"
import dotenv from 'dotenv'
import crypto from 'crypto'

type UserWithToplist = User & {
    toplist: Movie[]
}

export type UserWithRelations = User & {
    toplist: Movie[]
    friends: UserWithToplist[]
}

dotenv.config()

const hash = (password: string) => 
    CryptoJS.HmacSHA3(password, process.env.SECRET_KEY).toString()


export const login = async (email: string, password: string): Promise<UserWithRelations | null> => 
    await client.user.findFirst({
        where: {
            email,
            password: hash(password)
        },
        include: {
            toplist: true,
            friends: { include: { toplist: true } },
        }
    }) ?? null


export const register = async (email: string, username: string, password: string): Promise<{error: null | string}> => {

    const createToken = async (): Promise<string> => {
        const token = hash(crypto.randomUUID().toString())
        const existingToken = await client.user.findFirst({
            where: { token }
        })
        if (existingToken) return await createToken()
        return token
    }

    const existingUser = await client.user.findFirst({
        where: {
            OR: [
                {
                    email
                },
                {
                    username
                }
            ]
        }
    })
    if (existingUser) return { error: "Username or email already in use." }
    await client.user.create({
        data: {
            email,
            username,
            password: hash(password),
            token: await createToken()
        }
    })
    return { error: null }
}

export const deleteAccount = async (email: string): Promise<void> => {
    await client.comment.deleteMany({
        where: {
            user: {
                email
            }
        }
    })
    await client.rating.deleteMany({
        where: {
            user: {
                email
            }
        }
    })
    await client.user.delete({ where: { email } })
}

export const addFriend = async (adder: string, added: string): Promise<UserWithRelations | string> => {
    const addedFriend = await client.user.findFirst({
        where: { username: added }
    })

   if (!addedFriend) return 'User not found.'

    await client.$transaction([
        client.user.update({
            where: {
                username: adder
            },
            data: {
               friends: { connect: [{ username: added }] }
            }
        }),
        client.user.update({
            where: {
                username: added
            },
            data: {
                friends: { connect: [{ username: adder }] }
            }
        })
    ])
    return await client.user.findFirstOrThrow({
         where: { username: adder }, 
         include: {
            toplist: true,
            friends: { include: { toplist: true } },
        }
        })
} 

export const removeFriend = async (remover: string, removed: string): Promise<UserWithRelations | string> => {
    await client.$transaction([
        client.user.update({
            where: {
                username: remover
            },
            data: {
               friends: { disconnect: [{ username: removed }] }
            }
        }),
        client.user.update({
            where: {
                username: removed
            },
            data: {
                friends: { disconnect: [{ username: remover }] }
            }
        })
    ])
    return await client.user.findFirstOrThrow({
        where: { username: remover }, 
        include: {
           toplist: true,
           friends: { include: { toplist: true } },
       }
       })
}

export const changePassword = async (email: string, previousPassword: string, newPassword: string): Promise<{ error: string | null }> => {
    const user = await login(email, previousPassword)
    if (!login) return { error: "Invalid previous password" }
    await client.user.update({
        where: {
            email
        },
        data: {
            password: hash(newPassword)
        }
    })
    return { error: null }
}

export const changeUsername = async (email: string, username: string): Promise<{ error: string | null }> => {
    const existingUser = await client.user.findFirst({
        where: { username } 
    })
    if (existingUser) return { error: "Username or email already in use." }
    await client.user.update({
        where: {
            email
        },
        data: {
            username
        }
    })
    return { error: null }
}    

export const toplist = async (email: string, movieId: number): Promise<{ error: string | null }> => {
    const user = await client.user.findFirst({
        where: {
            email
        },
        include: {
            toplist: true
        }
    })
    if (!user) return { error: "User does not exist" }
    const result = await client.user.update({
        where: {
            email
        },
        data: {
            toplist: user.toplist.some(({ id }) => id === movieId) ? { disconnect: { id: movieId } } : { connect: { id: movieId } }
        },
        include: {
            toplist: true
        }
    })
    return { error: null }
}


export const mapFriends = (friends: UserWithToplist[]) => friends.map(({ username, toplist }) => ({ username, toplist }))
