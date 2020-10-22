const Database = require('../repository/db')

class Book{
    async ReadId(args){
        let id = args.id

        this.db = new Database()

        await this.db.ReadDatabase()

        let books = this.db.bookModels

        return books.filter(el=>{
            return el.id == id
        })[0]
    }

    async GetBook(){
        this.db = new Database()
        await this.db.ReadDatabase()
        return this.db.bookModels
    }

    async AddBook(payload){
        this.db = new Database()
        await this.db.AddToDatabase(payload.title, payload.author)

        return this.db.bookModel
    }

    async UpdateBook(payload){
        this.db = new Database()
        await this.db.UpdateToDatabase(payload.id, payload.title, payload.author)

        return this.db.bookModel
    }

    async DeleteBook(payload){
        this.db = new Database()
        await this.db.DeleteFromDatabase(payload.id)

        if(this.db.deleteStatus){
            return 'Document id ' + payload.id + ' successfully deleted'
        }else{
            return 'Error Delete document'
        }
    }
}

module.exports = Book