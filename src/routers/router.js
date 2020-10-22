const express = require('express');
const express_graphql = require('express-graphql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');// GraphQL schema
const cors = require('cors')

const BookUsecase = require('../controller/book')

class Router{
    constructor() {
        this.app = express()
    }

    async startServer(){
        let bookUsecase = new BookUsecase()

        let schema = buildSchema(`
            type Query{
                book(id : String) : Book
                books : [Book]
            }

            type Mutation{
                addBook(title : String, author : String) : Book
                deleteBook(id : String) : String
                updateBook(id : String, title : String, author : String) : Book
            }

            type Subscription{
                updatedBook(id : String!) : Book
            }
            
            type Book{
                id : ID!
                title : String!
                author : String!
            }

        `)

        let root = {
            book : bookUsecase.ReadId,
            books : bookUsecase.GetBook,
            addBook : bookUsecase.AddBook,
            updateBook : bookUsecase.UpdateBook,
            deleteBook : bookUsecase.DeleteBook,
            updatedBook : bookUsecase.ReadId
        }

        this.app.use(cors())

        this.app.use('/graphql', graphqlHTTP({
            schema : schema,
            rootValue : root,
            graphiql : true
        }))

        this.app.listen(3002, ()=>console.log('Express GraphQL Server Now Running On localhost:3002/graphql'))
    }
    
}

module.exports = Router;