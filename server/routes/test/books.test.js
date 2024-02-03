const supertest = require("supertest");
const app = require("../../app");
const { default: mongoose } = require("mongoose");
const Book = require("../../models/Books");

const api = supertest(app);

beforeAll(async () => {
  await Book.deleteMany({});
});



// get all books
test("get all books", async () => {
  await api.get("/api/books/").expect(200);
});

//failed get all books internal server error
test("error get all books", async () => {
  // Simulate an error by changing the find function behavior
  jest.spyOn(Book, 'find').mockRejectedValue(new Error('Simulated error'));

  await api.get("/api/books/").expect(500);
});


//post a book
test("POST / adds a new book", async () => {
  const newBook = {
    title: "New Book",
    author: "New Author",
    rating: 4,
    description: "New Description",
    image: "newimage.jpg",
    genres: ["Fantasy", "Adventure"],
  };

  const response = await api.post("/api/books/").send(newBook).expect(201);
});
//failed post
test(" error POST / adds a new book", async () => {
  const newBook = {
    image: "newimage.jpg",
    genres: ["Fantasy", "Adventure"],
  };

  const response = await api.post("/api/books").send(newBook).expect(400);
});

// get book by id
test("GET /:id retrieves a book by id", async () => {
  const newBook = {
    title: "Book to be retrieved",
    author: "Author",
    rating: 3,
    description: "Description",
    image: "image.jpg",
    genres: ["Drama", "Romance"],
  };
  const createdBook = await api.post("/api/books/").send(newBook);
  const response = await api
    .get(`/api/books/${createdBook.body._id}`)
    .expect(200);
});

//failed get book by id

test(" error GET /:id retrieves a book by id", async () => {
  const newBook = {
    title: "Book to be retrieved",
  };
  const createdBook = await api.post("/api/books/").send(newBook);
  const response = await api
    .get(`/api/books/${createdBook.body._id}`)
    .expect(400);
});

//patch book
test("PATCH /:id updates a book", async () => {
  const newBook = {
    title: "Book to be updated",
    author: "Author",
    rating: 3,
    description: "Description",
    image: "image.jpg",
    genres: ["Drama", "Romance"],
  };
  const createdBook = await api.post("/api/books/").send(newBook);
  const bookId = createdBook.body._id;
  console.log(bookId);

  const updatedBook = {
    title: "Book to be updated",
    author: "shghfjgsdhf",
    rating: 3,
    description: "Description",
    image: "image.jpg",
    genres: ["Drama", "Romance"],
  };
  await api.patch(`/api/books/${bookId}`).send(updatedBook).expect(200);
});

//failed patch book
test(" error PATCH /:id updates a book", async () => {
  const newBook = {
    title: "Book to be updated",
  };

  const createdBook = await api.post("/api/books/").send(newBook);
  const bookId = createdBook.body._id;

  const updatedBook = {
    title: "Book to be updated",
  };
  await api.patch(`/api/books/${bookId}`).send(updatedBook).expect(400);
});

// // Test the DELETE route to delete a book
test("DELETE /:id deletes a book", async () => {
  // Insert a book into the database
  const newBook = {
    title: "Book to be deleted",
    author: "Author",
    rating: 3,
    description: "Description",
    image: "image.jpg",
    genres: ["Drama", "Romance"],
  };

  const createdBook = await api.post("/api/books/").send(newBook);
  const bookId = createdBook.body._id;
  console.log(bookId);
  const response = await api.delete(`/api/books/${bookId}`).expect(200);
});

test(" error DELETE /:id deletes a book", async () => {
  // Insert a book into the database
  const newBook = {
    title: "Book to be deleted",
    author: "Author",
    rating: 3,
    description: "Description",
    image: "image.jpg",
    genres: ["Drama", "Romance"],
  };

  const createdBook = await api.post("/api/books/").send(newBook);
  const bookId = createdBook.body._id;
  console.log(bookId);
  const response = await api.delete(`/api/books/1234`).expect(400);
});

//upload image
// test("POST /uploadImage", async () => {
//     const response = await request(app)
//       .post('/uploadImage')
//       .attach('file', '__tests__/fixtures/image.jpg');
  
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('filedetails');
//     expect(response.body).toHaveProperty('message');
//     expect(response.body).toHaveProperty('image_url');
//   });
  
// test("POST /uploadImage - Error handling when no image is uploaded", async () => {
//     const response = await supertest(app)
//       .post('/uploadImage');
  
//     expect(response.status).toBe(400);
//     expect(response.text).toBe('Please upload a file!');
//   });
  


//post a book
// test("POST / adds a new book", async () => {
//     const newBook = {
//       title: "New Book",
//       author: "New Author",
//       rating: 4,
//       description: "New Description",
//       image: "newimage.jpg",
//       genres: ["Fantasy", "Adventure"],
//     };
  
//     const response = await api.post("/api/books/").send(newBook).expect(201);
//   });
//==================================================================================================

  
    // Add more test cases for error scenarios, edge cases, etc.


// After running the tests, clean up the database and close the connection
afterAll(async () => {
  await Book.deleteMany({});
  await mongoose.connection.close();
});
