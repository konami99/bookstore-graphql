import { ApolloServer, gql } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { AuthorResolver } from './resolvers/author.resolver'
import { getAuthor } from './queries/author.query'
import { MyContext } from './context'

async function main() {
  const schema = await buildSchema({
    resolvers: [AuthorResolver],
    emitSchemaFile: true,
  })

  // prisma generate
  // prisma migrate dev
  // npm run dev
  new ApolloServer({
    schema,
    context: async ({ req }): Promise<MyContext> => {
      const token: String = req.headers.authorization || '';
      let author = null
      if (token.length > 0) {
        const auth = token.split(' ')[1];
        const credentials = Buffer.from(auth, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        author = await getAuthor("null", username)
      }
      return { authAuthor: author }
    }
  }).listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: <http://localhost:4000>')
  )
}

main()