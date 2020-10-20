const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

let books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    title: 'Jurassic World',
    author: 'Michael Crichton',
  },
];

var schema = buildSchema(`
  type Books {
    title : String
    author : String
  }

  type Query {
    hello: String
    books : [Books!]!
  }
`);

const root = { 
  hello: () => 'Hello world!' ,
  books : () => books
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));