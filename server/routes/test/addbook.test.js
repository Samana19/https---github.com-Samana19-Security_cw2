const supertest = require('supertest');
const app = require('../../app'); // Your Express app file path
const mongoose = require('mongoose');
const AddBook = require('../../models/AddBook'); // Your Book model file path

const api = supertest(app);

let token = null;

beforeAll(async () => {
  await AddBook.deleteMany({});

  // Register a test user
  const registrationResponse = await api.post('/api/auth/register').send({
    name: 'test',
    email: 'test@gmail.com',
    password: 'test',
  });

  // Login to obtain the authentication token
  const loginResponse = await api.post('/api/auth/login').send({
    email: 'test@gmail.com',
    password: 'test',
  });

  token = loginResponse.body.token;
});



// Test case: logged in user can add a new book
test('POST /api/addbook/ adds a new book', async () => {
  const newBook = {
    title: 'New Book',
    author: 'New Author',
    rating: 4,
    description: 'New Description',
    image: 'https://example.com/book.jpg',
    genres: ['Fiction', 'Thriller'],
  };

  const response = await api
    .post('/api/addbook/')
    .send(newBook)
    .set('Authorization', `Bearer ${token}`)
    .expect(201);

  expect(response.body).toHaveProperty('_id');
  expect(response.body.title).toBe(newBook.title);
  expect(response.body.author).toBe(newBook.author);
  expect(response.body.rating).toBe(newBook.rating);
  expect(response.body.description).toBe(newBook.description);
  expect(response.body.image).toBe(newBook.image);
  expect(response.body.genres).toEqual(newBook.genres);
});

// Test case: not logged in user cannot add a new book
test('POST /api/addbook/ does not add a new book if user is not logged in', async () => {
  const newBook = {
    title: 'New Book',
    author: 'New Author',
    rating: 4,
    description: 'New Description',
    image: 'https://example.com/book.jpg',
    genres: ['Fiction', 'Thriller'],
  };


  await api.post('/api/addbook/').send(newBook).expect(401);

});

//404 error while posting a book
test("404 error while posting a book", async () => {
  const newBook = {
    title: "New Book",
    author: "New Author",
    genres: ["Fiction", "Thriller"],
  };

  await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(400);
});

// get all books
test("get all books", async () => {
  await api.get("/api/addbook/allbooks").expect(200);
});

afterAll(async () => {
  await AddBook.deleteMany({});
  await mongoose.connection.close();
});

//get book by id authorized
test("get book by id authorized", async () => {
  const newBook = {
    title: "New Book",
    author: "New Author",
    rating: 4,
    description: "New Description",
    image: "https://example.com/book.jpg",
    genres: ["Fiction", "Thriller"],
  };

  const response = await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const bookId = response.body._id;

  await api
    .get(`/api/addbook/${bookId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

//get book by id unauthorized
test("get book by id unauthorized", async () => {
  const newBook = {
    title: "New Book",
    author: "New Author",
    rating: 4,
    description: "New Description",
    image: "https://example.com/book.jpg",
    genres: ["Fiction", "Thriller"],
  };

  const response = await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const bookId = response.body._id;

  await api.get(`/api/addbook/123`).expect(401);
});

//get book by id Book not found (authorized) ()
test("get book by id Book not found (authorized", async () => {
  const newBook = {
    title: "New Book",
    author: "New Author",
    rating: 4,
    description: "New Description",
    image: "https://example.com/book.jpg",
    genres: ["Fiction", "Thriller"],
  };

  const response = await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const bookId = response.body._id;

  await api
    .get(`/api/addbook/123`)
    .set("Authorization", `Bearer ${token}`)
    .expect(500);
});

//get book by id Book not found (unauthorized)
// test("get book by id Book not found (unauthorized)", async () => {
  

//   const response = await api
//     .post("/api/addbook/")
//     .send(newBook)
//     .set("Authorization", `Bearer ${token}`)
//     .expect(201);

//   const bookId = response.body._id;



//   await api.get(`/api/addbook/123`).expect(500);
// });


//patch book by id authorized
test("patch book by id authorized", async () => {
  const newBook = {
    title: "New Book",
    author: "New",
    rating: 4,
    description: "New Book",
    image: "https://example.com/book.jpg",
    genres: ["Fiction", "Thriller"],
  };

  const response = await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const bookId = response.body._id;

  await api
    .patch(`/api/addbook/${bookId}`)
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

//patch book by id unauthorized user
test("patch book by id unauthorized", async () => {
  const newBook = {
    title: "New Book",
    author: "New",
    rating: 4,
    description: "New Book",
    image: "https://example.com/book.jpg",
    genres: ["Fiction", "Thriller"],
  };

  const response = await api
    .post("/api/addbook/")
    .send(newBook)

});

//patch book by id book not found (authorized)
// test("get book by id Book not found (authorized)", async () => {
//   const newBook = {
//     title: "New Book",
//     author: "New Author",
//     rating: 4,
//     description: "New Description",
//     image: "https://example.com/book.jpg",
//     genres: ["Fiction", "Thriller"],
//   };

//   const response = await api
//     .post("/api/addbook/")
//     .send(newBook)
//     .set("Authorization", `Bearer ${token}`)
//     .expect(201);

//   const bookId = response.body._id;

//   await api
//     .patch(`/api/addbook/123`)
//     .set("Authorization", `Bearer ${token}`)
//     .expect(404);
// });


//delete book by id authorized
test("delete book by id authorized", async () => {
  const newBook = {
    title: "New Book",
    author: "New Author",
    rating: 4,
    description: "New Description",
    image: "https://example.com/book.jpg",
    genres: ["Fiction", "Thriller"],
  };

  const response = await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const bookId = response.body._id;

  await api
    .delete(`/api/addbook/${bookId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

//error while deleting book by id authorized
test("error while deleting book by id authorized", async () => {
  const newBook = {
    title: "Book to be deleted",
    author: "Author",
    rating: 3,
    description: "Description",
    image: "image.jpg",
    genres: ["Drama", "Romance"],
  };
  

  const response = await api
    .post("/api/addbook/")
    .send(newBook)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const bookId = response.body._id;

  await api
  .delete(`/api/addbook/${bookId}`)

    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});


 
