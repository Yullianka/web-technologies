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


const bookTemplate = ({ title, author, pages, price }) => `
<tr>
    <td>${title}</td>
    <td>${author}</td>
    <td>${pages}</td>
    <td>${price} грн</td>
</tr>`;


let currentBooks = [];


const renderBooksList = (books) => {
    booksList.innerHTML = "";  
    for (const book of books) {
        addBookToPage(book); 
    }
    currentBooks = books; 
};


const addBookToPage = ({ title, author, pages, price }) => {
    booksList.insertAdjacentHTML(
        "beforeend", 
        bookTemplate({ title, author, pages, price })
    );
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
    const clearInputs = () => {
        searchInput.value = "";  
    };
    clearInputs();
    
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


clearButton.addEventListener("click", () => {
    searchInput.value = "";  
    renderBooksList(books);  
});
