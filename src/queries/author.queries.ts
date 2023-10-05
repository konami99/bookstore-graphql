import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export function getAuthor(id: any): any {
  try {
    const resp = {
      id: 1,
      name: 'Rex',
      gender: 'M'
    }
    return resp
  } catch (err) {
    return err
  }
}

export function listAuthors(): any {
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