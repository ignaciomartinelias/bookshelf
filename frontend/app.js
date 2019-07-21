import "./styles/app.css";
import UI from "./UI";

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.renderBooks();
})

document.getElementById("book-form")
    .addEventListener('submit', event => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('isbn', isbn);

        ui.addNewBook(formData);

        event.preventDefault();
    })

    document.getElementById("books-cards")
        .addEventListener("click", e => {
            if(e.target.classList.contains("delete")){
                const bookId = e.target.getAttribute("_id");
                ui.deleteBook(bookId);
            }
            e.preventDefault();
        })