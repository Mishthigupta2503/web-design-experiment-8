const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Sample book collection
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
    { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
    { id: 3, title: "Harry Potter", author: "J.K. Rowling" }
];

// 1. CREATE - Add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length ? Math.max(...books.map(book => book.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// 2. READ - Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// READ - Get a single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// 3. UPDATE - Update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

// 4. DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully", book: deletedBook[0] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});