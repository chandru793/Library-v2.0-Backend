const Books = require("../model/BookSchema");
const Users = require("../model/UserSchema");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
  const books = await Books.findOneAndDelete({ _id: booksID });
  if (!books) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json({ books });
  console.log("Delete Book");
});

//SignUp
const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const newpassword = await bcrypt.hash(req.body.password, 10);
    await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: newpassword,
    });
    res.status(201).json({ status: "ok" });
    console.log("Create Profile");
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
};

//login
const loginUser = asyncWrapper(async (req, res) => {
  const user = await Users.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({ status: "error", error: "Invalid input" });
  }

  const isPasswordvalid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (user && isPasswordvalid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      `secret123`
    );
    console.log("User Found");
    return res.json({ status: "ok", user: token, name: user.name });
  } else {
    console.log("User Not found");
    return res.json({ status: "error", user: false });
  }
  res.json({ status: "ok" });
});

//Decode
const decodeUser = asyncWrapper(async (req, res) => {
  try {    
    const token = req.body.token;
    const user = jwt.decode(req.body.token);
    console.log("User Decode success");
    res.status(200).json({user: user });
  } catch (error) {
    console.log("user error");
    res.json({ status: "error" });
  }
});

module.exports = {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  createUser,
  loginUser,
  decodeUser,
};
