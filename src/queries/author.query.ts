import "reflect-metadata";
import { PrismaClient  } from '@prisma/client';
import { AuthorInput, Author } from '../schemas/author.schema'

const prisma = new PrismaClient()

export async function getAuthor(id: string, username: string): Promise<Author> {
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
        pseudonym: true,
        books: {
          include: {
            book: true,
          }
        }
      }
    })
  } catch (err) {
    return err
  }
}

export async function listAuthors(): Promise<Author[]> {
  try {
    return prisma.author.findMany({
      include: {
        bankAccounts: true,
        books: {
          include: {
            book: true,
          }
        }
      }
    });
  } catch (err) {
    return err
  }
}