const Books = require("../model/schema");
const asyncWrapper = require("../middleware/async");

const getAllBooks = asyncWrapper(async (req, res) => {
  const books = await Books.find({});
  res.status(200).json({ books });
  console.log("Get All Books");
});

const createBook = asyncWrapper(async (req, res) => {
  const books = await Books.create(req.body);
  res.status(201).json({ books });
  console.log("Create Book");
});

const getBook = asyncWrapper(async (req, res) => {
  const { id: booksID } = req.params;
    const books = await Books.findOne({ _id: booksID });
    if (!books) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ books });
  console.log("Get a single Book");
});

const updateBook = asyncWrapper(async (req, res) => {
    const { id: booksID } = req.params;
    const books = await Books.findOneAndUpdate({ _id: booksID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!books) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ books });
    console.log("Update Book");
});

const deleteBook = asyncWrapper(async (req, res) => {
    const { id: booksID } = req.params;
    const books = await Books.findOneAndDelete({ _id: booksID })
    if (!books) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ books });
    console.log("Delete Book");
});

module.exports = {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
