import "reflect-metadata";
import { PrismaClient  } from '@prisma/client';
import { Author } from '../schemas/author.schema'

const prisma = new PrismaClient()

export async function getAuthor(id: string, username: string): Promise<Author> {
  try {
    return prisma.author.findFirst({
      where: {
        id: parseInt(id) || undefined,
        username: username || undefined,
      },
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