import NextAuth from 'next-auth'
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from 'crypto';

const prisma = new PrismaClient()

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const userDB = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: crypto.createHash('md5').update(credentials.password).digest('hex')
            
                    },
                })
                if (!userDB){
                    throw new Error('Email o password non validi')
                }
                return userDB
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session
        }
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        secret: process.env.JWT_SECRET,
        encryption: true
    },
}
export default NextAuth(authOptions)