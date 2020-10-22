const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors')
const { GraphQLServer } = require('graphql-yoga')
const admin = require('firebase-admin')
const serviceAccount = require('./src/repository/serviceAccountKey.json')

admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

function ReadDatabase(){
  let books = []
  admin.firestore().collection('books').get()
  .then(snapshot=>{
      snapshot.forEach(doc=>{
        console.log(doc.id, doc.data().title, doc.data().author)
      })
  })
  return []
}

let books = [
  {
    id : 1,
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    id : 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
  {
    id : 3,
    title: 'Jurassic World',
    author: 'Michael Crichton',
  },
];

const typeDefs = buildSchema(`
  type Book {
    id : ID!
    title : String!
    author : String!
  }

  type Query {
    hello: String
    books : [Book!]!
  }

`);

const resolvers = { 
  hello: () => 'Hello world!' ,
  books : ReadDatabase(),
};

const app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: typeDefs,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(3001, () => console.log('Now browse to localhost:3001/graphql'));
