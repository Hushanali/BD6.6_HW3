let { getBooks, getBooksById } = require('../controllers/index');
const { app } = require('../index');
const request = require('supertest');
const http = require('http');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getBooks: jest.fn(),
  getBooksById: jest.fn(),
}));

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('test functions', () => {
  // 1
  it('should return all books', async () => {
    let mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getBooks.mockReturnValue(mockBooks);
    const res = await request(server).get('/books');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockBooks);
    expect(res.body.length).toBe(3);
  });

  // 2
  it('should get book by id', async () => {
    let mockBook = {
      bookId: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Dystopian',
    };

    getBooksById.mockReturnValue(mockBook);
    const res = await request(server).get('/books/details/2');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockBook);
  });
});

// 3
describe('verify getbooks function', () => {
  it('should return all books', async () => {
    let mockBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getBooks.mockReturnValue(mockBooks);
    const result = await getBooks();
    expect(result).toEqual(mockBooks);
    expect(result.length).toBe(3);
  });
});
