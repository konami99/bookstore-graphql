import { PrismaClient } from '@prisma/client';
import { AuthorInput, Author } from '../authors.schema'

const prisma = new PrismaClient()

export async function getAuthor(id: number): Promise<any> {
  try {
    return prisma.author.findFirst({
      where: {
        id
      },
      include: {
        bankAccounts: true,
        books: {
          include: {
            book: true
          }
        }
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
        bankAccounts: true,
        books: {
          include: {
            book: true
          }
        }
      }
    });
  } catch (err) {
    return err
  }
}