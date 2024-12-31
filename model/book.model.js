const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        bookTitle: {
            type: String,
            required: [true, "Please enter a Book name"],
        },
        authorName: {
            type: String,
            required: [true, "Please enter the author's name"],
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        date: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        Timestamps: true
    }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;