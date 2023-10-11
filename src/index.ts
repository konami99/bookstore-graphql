import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { AuthorResolver } from './authors.resolvers'

async function main() {
  const schema = await buildSchema({
    resolvers: [AuthorResolver],
    emitSchemaFile: true,
  })

  // prisma generate
  // npm run dev
  new ApolloServer({ schema }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: <http://localhost:4000>')
  )
}

main()