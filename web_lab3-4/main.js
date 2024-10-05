const books = [
    { title: "The Adventures of Huckleberry Finn", pages: 250, author: "Mark Twain", price: 450 },
    { title: "And Then There Were None", pages: 300, author: "Agatha Christie", price: 300 },
    { title: "The Shining", pages: 120, author: "Stephen King", price: 400 },
    { title: "The Color Purple", pages: 180, author: "Alice Walker", price: 250 },
    { title: "The Great Gatsby", pages: 250, author: "F. Scott Fitzgerald", price: 350 },
    { title: "To Kill a Mockingbird", pages: 280, author: "Agatha Christie", price: 300 },
    { title: "1984", pages: 328, author: "George Orwell", price: 400 },
    { title: "The Catcher in the Rye", pages: 230, author: "J.D. Salinger", price: 350 },
    { title: "To the Lighthouse", pages: 180, author: "Agatha Christie", price: 250 },
    { title: "The Sun Also Rises", pages: 170, author: "J.D. Salinger", price: 250 },
    { title: "1915", pages: 250, author: "George Orwell", price: 400 },
    { title: "Brave New World", pages: 300, author: "Aldous Huxley", price: 450 },
    { title: "Animal Farm", pages: 150, author: "Harper Lee", price: 300 },
];

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

const bookTemplate = ({ title, author, pages, price }, index) => `
<tr>
    <td>${title}</td>
    <td>${author}</td>
    <td>${pages}</td>
    <td>${price} грн</td>
    <td><button class="edit-button" data-index="${index}">Edit</button></td>
</tr>`;

const renderBooksList = (books) => {
    booksList.innerHTML = "";
    books.forEach((book, index) => {
        booksList.insertAdjacentHTML("beforeend", bookTemplate(book, index));
    });
    currentBooks = books;
};

renderBooksList(books);


searchButton.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase().trim();
    const foundBooks = books.filter(
        (book) => book.title.toLowerCase().includes(query) || 
                  book.author.toLowerCase().includes(query)
    );
    renderBooksList(foundBooks);
});


clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderBooksList(books);
});


sortPriceButton.addEventListener("click", () => {
    const sortedBooks = [...currentBooks].sort((a, b) => a.price - b.price);
    renderBooksList(sortedBooks);
});


sortPagesButton.addEventListener("click", () => {
    const sortedBooks = [...currentBooks].sort((a, b) => a.pages - b.pages);
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

function closeModal() {
    modal.style.display = "none";
    bookForm.reset(); 
}


const isAuthorValid = (author) => {
    const regex = /\d/; 
    return !regex.test(author); 
};


const isUniqueTitle = (title) => {
    return !books.some((book) => book.title.toLowerCase() === title.toLowerCase());
};

saveBookButton.addEventListener("click", (event) => {
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
        books[editBookIndex] = newBook;
    } else {
        books.push(newBook);
    }
    renderBooksList(books);
    closeModal(); 
});


booksList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-button")) {
        editBookIndex = event.target.dataset.index; 
        const bookToEdit = books[editBookIndex];

        titleInput.value = bookToEdit.title;
        authorInput.value = bookToEdit.author;
        pagesInput.value = bookToEdit.pages;
        priceInput.value = bookToEdit.price;

        modal.style.display = "block"; 
    }
});
