import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'graphql'
import { getAuthor, listAuthors } from './queries/authors.queries'
import { addAuthor } from './mutations/authors.mutations'
const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    gender: String!
    pseudonym: String!
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

  type Book {
    id: ID!
    title: String!
    authors: [BookOnAuthor]
  }

  input AuthorInput {
    name: String!
    gender: String!
    pseudonym: String!
    books: [BookInput]
    bankAccounts: [BankAccountInput]
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
