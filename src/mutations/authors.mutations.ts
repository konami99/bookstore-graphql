import "reflect-metadata";
import { PrismaClient } from '@prisma/client';
import { AuthorInput, Author } from '../authors.schema'

const prisma = new PrismaClient()

export async function addAuthor(authorToAdd: AuthorInput): Promise<Author> {
  const author = await prisma.author.create({
    data: {
      name: authorToAdd.name,
      gender: authorToAdd.gender,
      pseudonym: authorToAdd.pseudonym,
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
      bankAccounts: true,
      books: {
        select: {
          book: true,
        }
      }
    }
  })
}