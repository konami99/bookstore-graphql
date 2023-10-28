import "reflect-metadata";
import { PrismaClient, Author } from '@prisma/client';
import { AuthorInput } from "../inputs/author.input";

const prisma = new PrismaClient()

export async function addAuthor(authorToAdd: AuthorInput): Promise<Author> {
  const author = await prisma.author.create({
    data: {
      name: authorToAdd.name,
      gender: authorToAdd.gender,
      username: authorToAdd.username,
      password: authorToAdd.password,
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
      pseudonym: true,
      books: {
        include: {
          book: true
        }
      },
    }
  })
}