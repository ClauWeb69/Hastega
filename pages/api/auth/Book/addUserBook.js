import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    let dataDB = {
      id_user: session.user.id,
      id_book: req.body.id_book
    }
    const exist = await prisma.userbook.count({
      where: dataDB
    });
    if (exist == 0) {
      const newBook = await prisma.userbook.create({
        data: dataDB
      })
    }
    res.status(200).json({});
  } else
    res.status(500).json({});
}