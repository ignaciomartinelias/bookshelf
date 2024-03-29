import BookService from "./services/BookService";
import {format} from 'timeago.js';

const bookService = new BookService();

class UI {
	async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById("books-cards")
        booksCardContainer.innerHTML = '';
        books.forEach( book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4 image-container">
                            <img src="${book.imagePath}" class="img-thumbnail m-auto d-block">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block p-4">
                                <h4 class="mr-4">${book.title}</h4>
                                <p class="card-text">by <em>${book.author}</em></p>
                                <a class="btn btn-danger delete" _id="${book._id}" href="#">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        })
    }

	async addNewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
        this.renderMessage("New Book Added!", "success", 3000);
    }

	async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
        this.renderMessage("Book Removed!", "danger", 3000);
    }

	clearBookForm() {
        document.getElementById("book-form").reset();
    }

	renderMessage(message, color, sec) {
        const div = document.createElement("div");
        div.className = `alert alert-${color} message animated fadeInDown`;
        div.appendChild(document.createTextNode(message));


        const container = document.querySelector(".col-md-4");
        const bookForm = document.querySelector("#book-form");

        container.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector(".message").classList.add("fadeOutUp");
        }, sec);
        setTimeout(() => {
            document.querySelector(".message").remove();
        }, sec+1000);
    }
}

export default UI;
