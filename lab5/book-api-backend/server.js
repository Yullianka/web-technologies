const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());

let books = [
    { id: 1, title: "The Adventures of Huckleberry Finn", pages: 250, author: "Mark Twain", price: 450 },
    { id: 2, title: "And Then There Were None", pages: 300, author: "Agatha Christie", price: 300 },
    { id: 3, title: "The Shining", pages: 120, author: "Stephen King", price: 400 },
    { id: 4, title: "The Color Purple", pages: 180, author: "Alice Walker", price: 250 },
    { id: 5, title: "The Great Gatsby", pages: 250, author: "F. Scott Fitzgerald", price: 350 },
    { id: 6, title: "To Kill a Mockingbird", pages: 280, author: "Agatha Christie", price: 300 },
    { id: 7, title: "1984", pages: 328, author: "George Orwell", price: 400 },
    { id: 8, title: "The Catcher in the Rye", pages: 230, author: "J.D. Salinger", price: 350 },
    { id: 9, title: "To the Lighthouse", pages: 180, author: "Agatha Christie", price: 250 },
    { id: 10, title: "The Sun Also Rises", pages: 170, author: "J.D. Salinger", price: 250 },
    { id: 11, title: "1915", pages: 250, author: "George Orwell", price: 400 },
    { id: 12, title: "Brave New World", pages: 300, author: "Aldous Huxley", price: 450 },
    { id: 13, title: "Animal Farm", pages: 150, author: "Harper Lee", price: 300 },
];


app.get("/books", (req, res) => {
    res.json(books);
});


app.get("/books/search", (req, res) => {
    const { query } = req.query;
    const searchQuery = query.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery) || 
        book.author.toLowerCase().includes(searchQuery)
    );
    res.json(filteredBooks);
});


app.get("/books/sort/price", (req, res) => {
    const sortedBooks = [...books].sort((a, b) => a.price - b.price);
    res.json(sortedBooks);
});


app.get("/books/sort/pages", (req, res) => {
    const sortedBooks = [...books].sort((a, b) => a.pages - b.pages);
    res.json(sortedBooks);
});



let currentMaxId = books.reduce((maxId, book) => Math.max(maxId, book.id), 0); 

app.post("/books", (req, res) => {
    const { title, pages, author, price } = req.body;

    if (!title || !pages || !author || !price) {
        return res.status(400).json({ message: "All fields are required." });
    }

    currentMaxId += 1; 

    const newBook = {
        id: currentMaxId,
        title,
        pages,
        author,
        price,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});


app.patch("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { title, pages, author, price } = req.body;
    const book = books.find(b => b.id === bookId);

    if (book) {
        book.title = title || book.title;
        book.pages = pages || book.pages;
        book.author = author || book.author;
        book.price = price || book.price;
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});


app.delete("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    books = books.filter(b => b.id !== bookId);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
