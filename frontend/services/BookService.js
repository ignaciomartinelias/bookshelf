class BookService {
    constructor() {
        this.URL = "http://localhost:3000/api/books";
    }

    async getBooks() {
        const response = await fetch(this.URL);
        return await response.json();
    }

    async postBook(book) {
        const response = await fetch(this.URL, {
            method: 'POST',
            body: book
        });
        const data = await response.json();
        console.log(data);
    }

    async deleteBook(bookId) {
        const response = await fetch(`${this.URL}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    }
}

module.exports = BookService;