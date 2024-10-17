import { getAllBooks, postBook, updateBook, deleteBook, searchBooks, sortBooksByPrice, sortBooksByPages } from "./api.js";

const sortPriceButton = document.getElementById("sortPrice");
const sortPagesButton = document.getElementById("sortPages");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const calculateButton = document.getElementById("calculateButton");
const booksList = document.getElementById("booksList");
const totalPriceDisplay = document.getElementById("totalPrice");
const clearButton = document.getElementById("resetButton");
const createBookButton = document.getElementById("createbutton");
const saveBookButton = document.getElementById("saveButton");
const modal = document.getElementById("modalwindow");
const bookForm = document.getElementById("bookForm");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const priceInput = document.getElementById("priceInput");

let currentBooks = [];
let editBookIndex = null;  
let searchResults = [];

function closeModal() {
    modal.style.display = "none";
    bookForm.reset(); 
}


const closeModalButton = document.getElementById("closeModal");
closeModalButton.addEventListener("click", closeModal);


const bookTemplate = ({ title, author, pages, price }, index) => `
<tr>
    <td>${title}</td>
    <td>${author}</td>
    <td>${pages}</td>
    <td>${price} грн</td>
    <td><button class="edit-button" data-index="${index}">Edit</button></td>
     <td><button class="delete-button" data-id="${index}">Delete</button></td>
</tr>`;

const renderBooksList = (books) => {
    booksList.innerHTML = "";
    books.forEach((book, index) => {
        booksList.insertAdjacentHTML("beforeend", bookTemplate(book, index));
    });
    currentBooks = books;
};

const loadBooks = async () => {
    const books = await getAllBooks(); 
    renderBooksList(books);
};
loadBooks();

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.toLowerCase().trim();
    const searchResults = await searchBooks(query);
    renderBooksList(searchResults);
});

clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderBooksList(currentBooks); 
});

sortPriceButton.addEventListener("click", async () => {
    const sortedBooks = await sortBooksByPrice();
    renderBooksList(sortedBooks);
});

sortPagesButton.addEventListener("click", async () => {
    const sortedBooks = await sortBooksByPages();
    renderBooksList(sortedBooks);
});

calculateButton.addEventListener("click", () => {
    const total = currentBooks.reduce((acc, { price }) => acc + price, 0);
    totalPriceDisplay.textContent = total;
});

createBookButton.addEventListener("click", () => {
    editBookIndex = null;  
    modal.style.display = "block"; 
});

const isAuthorValid = (author) => {
    const regex = /\d/; 
    return !regex.test(author); 
};

const isUniqueTitle = (title) => {
    return !currentBooks.some((book) => book.title.toLowerCase() === title.toLowerCase());
};

saveBookButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const newTitle = titleInput.value.trim();
    const newAuthor = authorInput.value.trim();
    const newPages = parseInt(pagesInput.value);
    const newPrice = parseFloat(priceInput.value);

    if (!isAuthorValid(newAuthor)) {
        alert("Author name cannot contain numbers!");
        return;
    }

    if (!newTitle || !newAuthor || isNaN(newPages) || isNaN(newPrice) || newPages <= 0 || newPrice <= 0) {
        alert("Please fill in all the data correctly!");
        return;
    }

    if (editBookIndex === null && !isUniqueTitle(newTitle)) {
        alert("A book with this title already exists!");
        return;
    }

    const newBook = {
        title: newTitle,
        author: newAuthor,
        pages: newPages,
        price: newPrice,
    };

    if (editBookIndex !== null) {
        const bookToEdit = currentBooks[editBookIndex];
        await updateBook(bookToEdit.id, newBook); 

        if (searchResults.length > 0) {
            searchResults[editBookIndex] = newBook;
            renderBooksList(searchResults);
        } else {
            loadBooks();
        }
    } else {
        await postBook(newBook);
        loadBooks();
    }

    closeModal(); 
});

booksList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
        editBookIndex = event.target.dataset.index; 
        const bookToEdit = currentBooks[editBookIndex];

        titleInput.value = bookToEdit.title;
        authorInput.value = bookToEdit.author;
        pagesInput.value = bookToEdit.pages;
        priceInput.value = bookToEdit.price;

        modal.style.display = "block"; 
    }
});

booksList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button")) {
        const bookIndex = event.target.dataset.id;
        const bookToDelete = currentBooks[bookIndex];

        await deleteBook(bookToDelete.id); 

        if (searchResults.length > 0) {
            searchResults = searchResults.filter(book => book.id !== bookToDelete.id);
            renderBooksList(searchResults);
        } else {
            loadBooks(); 
        }
    }
});
