import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'graphql'
import { getAuthor, listAuthors } from './queries/author.queries'

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    gender: String!
    pseudonym: Pseudonym!
    books: [Book]
    bankAccounts: [BankAccount]
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

const resolvers = {
  Query: {
    authors: () => listAuthors(),
    author: (_, { id }) => getAuthor(id)
  },
}

new ApolloServer({ typeDefs, resolvers }).listen({ port: 4000 }, () =>
  console.log('🚀 Server ready at: <http://localhost:4000>')
)
