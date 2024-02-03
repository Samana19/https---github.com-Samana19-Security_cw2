const supertest = require("supertest");
const app = require("../../app"); // Update with your app's path
const mongoose = require("mongoose");
const Review = require("../../models/Review");
const Book = require("../../models/Books");

const api = supertest(app);

let token = null;
let bookId = null;

beforeAll(async () => {
  await Review.deleteMany({});
  await Book.deleteMany({});

  await api.post("/api/auth/register").send({
    name: "test",
    email: "test@gmail.com",
    password: "test",
  });

  const Loginresponse = await api.post("/api/auth/login").send({
    email: "test@gmail.com",
    password: "test",
  });

  token = Loginresponse.body.token;

  const bookResponse = await api
    .post("/api/books/")
    .send({
      title: "Book to be retrieved",
      author: "Author",
      rating: 3,
      description: "Description",
      reviews: [],
    })
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  bookId = bookResponse.body._id;
  // console.log("response", bookResponse.body);
});

test("logged in user can post a review", async () => {
  const newReview = {
    rating: 4,
    content: "A well-written review.",
  };

  await api
    .post(`/api/reviews/${bookId}`)
    .send(newReview)
    .set("Authorization", `Bearer ${token}`)
    .expect(201);
});


//not logged in user cannot post a review
test("not logged in user cannot post a review", async () => {
  const newReview = {
    book: bookId,
    rating: 4,
    content: "A well-written review.",
  };

  const response = await api
    .post(`/api/reviews/${bookId}`)
    .send(newReview)
    .expect(401);
});

//fetch all reviews for a book
test("should fetch all reviews for a book", async () => {
  const response = await api.get(`/api/reviews/${bookId}`).expect(200);

  expect(response.body).toBeInstanceOf(Array);
  expect(response.body.length).toBe(1); // Adjust as per your test data

  const reviewId = response.body[0]._id;
  console.log("reviewId", reviewId);
});

// //not fetch all reviews for a book
// not fetch all reviews for a book
test("should not fetch all reviews for a book", async () => {
  const nonExistentBookId = "nonexistentbookid"; // Provide a non-existent book ID

  const response = await api.get(`/api/reviews/${nonExistentBookId}`).expect(404);

  expect(response.body).toBeDefined();
  expect(response.body.error).toBeDefined();
});


// //fetch a specific review
test("should fetch a specific review", async () => {
    const review = await Review.findOne({}).select("_id"); // Fetch review object
    const reviewId = review._id.toString(); // Extract _id value
    console.log("reviewId fetch", reviewId);
  
    await api.get(`/api/reviews/${bookId}/${reviewId}`).expect(200);
  });

// //not fetch a specific review
test(" error fetching a specific review", async () => {
    const review = await Review.findOne({}).select("_id"); // Fetch review object
    const reviewId = review._id.toString(); // Extract _id value
    console.log("reviewId fetch", reviewId);


    await api.get(`/api/reviews/${bookId}/tfytft`).expect(500);
    });

// //logged in user can update a specific review
test("logged in user can update a specific review", async () => {
    const review = await Review.findOne({}).select("_id"); // Fetch review object
    const reviewId = review._id.toString(); // Extract _id value
    console.log("reviewId fetch", reviewId);

    const updatedReview = {
        rating: 4,
        content: "A well-written review.",
      };

    await api
      .patch(`/api/reviews/${bookId}/${reviewId}`)
      .send(updatedReview)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

// //not logged in user cannot update a specific review
test("not logged in user cannot update a specific review", async () => {
    const review = await Review.findOne({}).select("_id"); // Fetch review object
    const reviewId = review._id.toString(); // Extract _id value
    console.log("reviewId fetch", reviewId);

    const updatedReview = {

        rating: 4,
        content: "A well-written review.",
      };

    await api
      .patch(`/api/reviews/${bookId}/123`)
      .send(updatedReview)
      .expect(401);
  });

  // //not logged in user cannot update a specific review
test("not logged in user cannot update a specific review", async () => {
    const review = await Review.findOne({}).select("_id"); // Fetch review object
    const reviewId = review._id.toString(); // Extract _id value
    console.log("reviewId fetch", reviewId);

    await api
      .delete(`/api/reviews/${bookId}/123`)
      .send("Authorization", `Bearer ${token}`)
      .expect(401);
  });

// //logged in user can delete a specific review
test("logged in user can delete a specific review", async () => {
    const review = await Review.findOne({}).select("_id"); // Fetch review object
    const reviewId = review._id.toString(); // Extract _id value
    console.log("reviewId fetch", reviewId);

    await api
      .delete(`/api/reviews/${bookId}/${reviewId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });




  

afterAll(async () => {
  await Review.deleteMany({});
  await mongoose.connection.close();
});
