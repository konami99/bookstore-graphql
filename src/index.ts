import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'graphql'
import { getAuthor, listAuthors } from './queries/author.queries'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    gender: String!
    pseudonym: Pseudonym!
    books: [Book]
    bankAccounts: [BankAccount]
  }

  input AuthorInput {
    name: String!
    gender: String!
    pseudonym: PseudonymInput
    books: [BookInput]
    bankAccounts: [BankAccountInput]
  }

  input PseudonymInput {
    name: String!
  }

  input BookInput {
    title: String!
  }

  input BankAccountInput {
    accountNumber: Int!
  }

  type BankAccount {
    id: ID!
    accountNumber: Int!
    author: Author!
  }

  type Pseudonym {
    id: ID!
    name: String!
    author: Author!
  }

  type Book {
    id: ID!
    title: String!
    authors: [Author]
  }

  type Query {
    authors: [Author],
    author(id: ID!): Author
  }
`

type BookInput = {
  title: string,
}

type BankAccountInput = {
  accountNumber: number,
}

type PseudonymInput = {
  name: string,
}

type AuthorInput = {
  name: string,
  gender: string,
  books?: BookInput[],
  bankAccounts?: BankAccountInput[],
  pseudonym?: PseudonymInput,
}

const resolvers = {
  Query: {
    authors: () => listAuthors(),
    author: (_, { id }) => getAuthor(id)
  },
}

new ApolloServer({ typeDefs, resolvers }).listen({ port: 4000 }, () =>
  console.log('🚀 Server ready at: <http://localhost:4000>')
)
