import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]"
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  const books = await prisma.book.findMany({
    where: {
      NOT: {
        userbook: {
          some: {
            id_user: session.user.id,
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      author: true,
      summary: true,
      isbn: true,
      cover: true,
    },
  });
  res.status(200).json(books);
}