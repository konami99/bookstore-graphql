import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'graphql'
import { getAuthor, listAuthors, addAuthor } from './queries/author.queries'

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    gender: String!
    pseudonym: Pseudonym!
    books: [BookOnAuthor]
    bankAccounts: [BankAccount]
  }

  type BookOnAuthor {
    book: Book
    author: Author
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
    authors: [BookOnAuthor]
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
    accountNumber: String!
  }

  type Query {
    authors: [Author],
    author(id: ID!): Author
  }

  type Mutation {
    addAuthor(authorToAdd: AuthorInput!): Author
  }
`

type BookInput = {
  title: string,
}

type BankAccountInput = {
  accountNumber: string,
}

type PseudonymInput = {
  name: string,
}

export type AuthorInput = {
  name: string,
  gender: string,
  books?: BookInput[],
  bankAccounts?: BankAccountInput[],
  pseudonym?: PseudonymInput,
}

export type Author = {
  id: number,
  name: string,
  gender: string,
  createdAt: Date,
  updatedAt: Date,
}

const resolvers = {
  Query: {
    authors: () => listAuthors(),
    author: (_, { id }) => getAuthor(id)
  },
  Mutation: {
    addAuthor: (_, { authorToAdd }) => addAuthor(authorToAdd),
  }
}

// prisma generate
// npm run dev

new ApolloServer({ typeDefs, resolvers }).listen({ port: 4000 }, () =>
  console.log('🚀 Server ready at: <http://localhost:4000>')
)
