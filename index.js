const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/book.model.js');

const app = express()

app.use(express.json());


// GET all book
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new product
app.post('/api/books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: "Invalid request body" });
    }
});
// PUT update existing book
app.put('/api/books/:id', async (req, res) => {
    try {
        let book = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: "Invalid request body" });
    }
});

// GET single book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE book
app.delete('/api/books/:id', async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect("mongodb+srv://admin:1234@backenddb.z8xdl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() =>{
    console.log("Connected to database!");
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000");
    });
})
.catch(() => {
    console.log("Connection failed!");
})