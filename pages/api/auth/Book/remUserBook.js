import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {

    const deletedBook = await prisma.userbook.delete({
      where: {
        id_user_id_book: {
          id_user: session.user.id,
          id_book: req.body.id_book
        }
      }
    })
  
    res.status(200).json({});
  } else
    res.status(500).json({});
}