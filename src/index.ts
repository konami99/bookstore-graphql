import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'graphql'

const app = async () => {
  const schema = buildSchema(`
    type Author {
      id: ID!
      name: String
      gender: String
      createdAt: String
      updatedAt: String
    }

    type Query {
      authors: [Author],
      author(id: ID!): Author
    }
  `)

  const resolvers = {
    Query: {
      authors: () => "{}",
      author: (_, { id }) => "{}"
    },
  }

  new ApolloServer({ schema, resolvers }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: <http://localhost:4000>')
  )
}

app()
