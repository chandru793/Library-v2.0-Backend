const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  createUser,
  loginUser,
  decodeUser,
} = require("../controllers/controllers");

router.route(`/signup`).post(createUser);
router.route(`/login`).post(loginUser);
router.route(`/decode`).post(decodeUser);
router.route(`/v2/library/`).get(getAllBooks).post(createBook);
router
  .route(`/v2/library/:id`)
  .get(getBook)
  .patch(updateBook)
  .delete(deleteBook);

module.exports = router;