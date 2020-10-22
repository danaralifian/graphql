const admin = require('firebase-admin')
const BookModel = require('../models/book')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({credential: admin.credential.cert(serviceAccount)})

class Database{
    constructor() {
        this.admin = admin
        this.bookModels = []
        this.bookModel = {}
        this.serviceAccount = serviceAccount
        this.deleteStatus = false        
    }

    get Admin(){
        return this.admin
    }

    set Admin(admin){
        this.admin = admin
    }

    get BookModel(){
        return this.bookModel
    }

    set BookModel(bookModel){
        this.bookModel = bookModel
    }

    get ServiceAccount(){
        return this.serviceAccount
    }

    set ServiceAccount(serviceAccount){
        this.serviceAccount = serviceAccount
    }

    get DeleteStatus(){
        return this.deleteStatus
    }

    set DeleteStatus(status){
        this.deleteStatus = status
    }

    get DB(){
        return this.admin.firestore()
    }

    async AddToDatabase(title, author){
        await this.DB.collection('books').add({
            title : title,
            author : author
        })
        .then(ref=>this.bookModel = new BookModel(ref.id, title, author))
    }

    async UpdateToDatabase(id, title, author){
        await this.DB.collection('books').doc(id).update({
            title : title,
            author : author
        })
        .then(ref=>this.bookModel = new BookModel(ref.id, title, author))
    }

    async DeleteFromDatabase(id){
        await this.DB.collection('books').doc(id).delete()
        .then(ref=> this.deleteStatus = true)
    }

    async ReadDatabase(){
        var books = []
        await this.DB.collection('books').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var bookModel = new BookModel(doc.id, doc.data().title, doc.data().author)
                books.push(bookModel)
            })
            this.bookModels = books
        })
        .catch(()=>{
            return null
        })
    }

    toString(){
        const output = {
            admin : this.admin,
            serviceAccount : this.serviceAccount
        }

        return JSON.stringify(output, null, 2)
    }
    
}

module.exports = Database