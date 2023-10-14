import { PrismaClient } from '@prisma/client';
import { AuthorInput, Author } from '../authors.schema'

const prisma = new PrismaClient()

export async function getAuthor(id: string, username: string): Promise<any> {
  try {
    const where: { id?: number; username?: string } = {};

    if (id !== "null") {
      where.id = parseInt(id);
    }

    if (username !== "null") {
      where.username = username;
    }

    return prisma.author.findFirst({
      where: where,
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