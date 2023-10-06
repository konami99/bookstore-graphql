import { PrismaClient } from '@prisma/client';
import { AuthorInput, Author } from '../index'

const prisma = new PrismaClient()

export async function addAuthor(authorToAdd: AuthorInput): Promise<any> {
  const author: Author = await prisma.author.create({
    data: {
      name: authorToAdd.name,
      gender: authorToAdd.gender,
      pseudonym: { create: { name: authorToAdd.pseudonym.name } },
    },
  })

  await prisma.bankAccount.createMany({
    data: authorToAdd.bankAccounts.map((ba) => ({
      ...ba,
      authorId: author.id,
    })),
  });

  await Promise.all(authorToAdd.books.map(async(b) => {
    const book = await prisma.book.create({
      data: {
        ...b
      }
    })
    await prisma.booksOnAuthors.create({
      data: {
        bookId: book.id,
        authorId: author.id,
      }
    })
  }))

  return prisma.author.findFirst({
    where: {
      id: author.id,
    },
    include: {
      pseudonym: true,
      bankAccounts: true,
      books: {
        include: {
          book: true
        }
      },
    }
  });
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