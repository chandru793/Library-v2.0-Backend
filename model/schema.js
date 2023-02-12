const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "Must provide a book name"],
    trim: true,
    maxlength: [100, "Book name cannot be more than 100 characters"],
  },
  authorName: {
    type: String,
    required: [true, "Must provide an author name"],
    trim: true,
    maxlength: [100, "Author name cannot be more than 100 characters"],
  },
  bookDescription: {
    type: String,
    required: [true, "Must provide a book description"],
    trim: true,
    maxlength: [1000, "Book description cannot be more than 1000 characters"],
  },
  image: {
    type: String,
    required: [true, "Must provide an image"],
  },
});

module.exports = mongoose.model("Books", BookSchema);
