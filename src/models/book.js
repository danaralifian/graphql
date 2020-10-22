class Book {
    constructor(id, title, author) {
        this.id = id
        this.title = title
        this.author = author
    }

    get Id(){
        return this.id
    }

    get Title(){
        return this.title
    }

    get Author(){
        return this.author
    }

    set Id(id){
        this.id = id
    }

    set Title(title){
        this.title = title
    }
    
    set Author(author){
        this.author = author
    }

    toString() {
        const output = {    
            Id : this.id,
            title: this.title,
            author: this.author,
        };
    
        return JSON.stringify(output, null, 3);
    }
}

module.exports = Book