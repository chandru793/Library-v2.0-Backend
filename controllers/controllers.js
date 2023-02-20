const Books = require("../model/BookSchema");
const Users = require("../model/UserSchema");
const asyncWrapper = require("../middleware/async");
const jwt = require("jsonwebtoken");
const bcrypt=require('bcryptjs')

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

  const newpassword=await bcrypt.hash(req.body.password,10)
  console.log(req.body);
  try {
    await Users.create({
      name: req.body.name,
      email: req.bodyemail,
      password:newpassword
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
    return{status:'error',error:'Incalid input'}
  }

  const isPasswordvalid = await bcrypt.compare(req.body.password, user.password)
  
  isPasswordvalid(passwordValid){
    const token = jwt.sign(
      {
        name: user.name,
        email:user.email
      }
    )
  }

  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      `secret123`
    );
    return res.json({ status: "ok", user: token });
    console.log("User Found");
  } else {
    return res.json({ status: "error", user: false });
    console.log("User Not found");
  }
  res.json({ status: "ok" });
});

const quoteUser = asyncWrapper(async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await Users.findOne({ email: email });
    return { status: "ok", quote: user.quote };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

const postQuoteUser = asyncWrapper(async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await Users.updateOne(
      { email: email },
      { $set: { quote: req.body.quote } }
    );
    return { status: "ok" };
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
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
  quoteUser,
  postQuoteUser,
};
