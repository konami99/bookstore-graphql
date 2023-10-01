import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'graphql'
import { getAuthor, listAuthors } from './queries/author.queries'


  const typeDefs = gql`
    type Author {
      id: ID!
      name: String!
      gender: String!
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

