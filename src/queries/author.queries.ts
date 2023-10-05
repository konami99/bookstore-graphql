import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getAuthor(id: string): Promise<any> {
  try {
    return prisma.author.findFirst({
      where: {
        id: parseInt(id)
      },
      include: {
        pseudonym: true,
        bankAccounts: true,
        books: true
      }
    })
  } catch (err) {
    return err
  }
}

export async function listAuthors(): Promise<any> {
  try {
    return prisma.author.findMany({
      include: {
        pseudonym: true,
        bankAccounts: true,
        books: true
      }
    });
  } catch (err) {
    return err
  }
}