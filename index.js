const express = require('express');
let { getBooks, getBooksById } = require('./controllers/index');
const app = express();

app.use(express.json());

// 1
app.get('/books', (req, res) => {
  let books = getBooks();
  res.json(books);
});

// 2
app.get('/books/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let book = getBooksById(id);
  res.json(book);
});

module.exports = {
  app,
};
