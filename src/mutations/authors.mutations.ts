import { PrismaClient } from '@prisma/client';
import { AuthorInput, Author } from '../authors.schema'

const prisma = new PrismaClient()

export async function addAuthor(authorToAdd: AuthorInput): Promise<Author> {
  const author = await prisma.author.create({
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

  return prisma.author.findUnique({
    where: {
      id: author.id,
    },
    include: {
      pseudonym: true,
      bankAccounts: true,
      books: true,
    }
  });
}