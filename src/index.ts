import express from 'express'; // yarn add express
import { createHandler } from 'graphql-http/lib/use/express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    },
  }),
});

const app = express();
app.all('/graphql', createHandler({ schema }));

app.listen({ port: 4000 });
console.log('Listening to port 4000');
