import { PrismaClient } from '@prisma/client';
import { AuthorInput, Author } from '../index'

const prisma = new PrismaClient()

export async function addAuthor(authorToAdd: AuthorInput): Promise<Author> {
  const author: Author = await prisma.author.create({
    data: {
      name: authorToAdd.name,
      gender: authorToAdd.gender,
      pseudonym: { create: { name: authorToAdd.pseudonym.name } },
    },
    include: {
      pseudonym: true,
      bankAccounts: true,
      books: true,
    }
  })

  return author;
}

export async function getAuthor(id: string): Promise<any> {
  try {
    return prisma.author.findFirst({
      where: {
        id: parseInt(id)
      },
      include: {
        pseudonym: true,
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
        pseudonym: true,
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