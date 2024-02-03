const supertest = require("supertest");
const app = require("../../app"); // Update with your app's path
const mongoose = require("mongoose");
const User = require("../../models/User");

const api = supertest(app);

let token = null;
let userId = null;

beforeAll(async () => {
  await User.deleteMany({});

  await api.post("/api/auth/register").send({
    name: "test",
    email: "test@gmail.com",
    password: "test",
  });

  const Loginresponse = await api
    .post("/api/auth/login")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(200);

  token = Loginresponse.body.token;
});

//get all users

test("get all users", async () => {
  await api.get("/api/users/all").expect(200);
});

//failed get all users internal server error
test("error get all users", async () => {
  // Simulate an error by changing the find function behavior
  jest.spyOn(User, "find").mockRejectedValue(new Error("Simulated error"));

  await api.get("/api/users/all").expect(500);
});

//logged in user can get their profile
test("logged in user can get their profile", async () => {
  const user = await User.findOne({}).select("_id");
  userId = user._id;
  await api
    .get(`/api/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

//error logged in user can get their profile
test("error logged in user can get their profile", async () => {
  const user = await User.findOne({}).select("_id");
  userId = user._id;
  jest.spyOn(User, "findById").mockRejectedValue(new Error("Simulated error"));
  await api
    .get(`/api/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(500);
});

//unauthorized user cannot get their profile
test("unauthorized user cannot get their profile", async () => {
    const user= await User.findOne({}).select("_id");

console.log("Fetched user:", user);

     const userId = user._id;
    await api.get(`/api/users/${userId}`).expect(401);
    });

test("logged in user can update their profile", async () => {
  const user = await User.findOne({}).select("_id");
  const userId = user._id.toString();
  const updatedUser = {
    name: "test",
    email: "test@gmail.com",
    password: "test",
  };

  console.log("userId", userId);
  console.log("token", token);

  await api
    .patch(`/api/users/${userId}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);
});

//unauthorized user cannot update their profile
test("unauthorized user cannot update their profile", async () => {
  const user = await User.findOne({}).select("_id");
  const userId = user._id.toString();

  const updatedUser = {
    name: "test", 
    email: "test@example.com",
    password: "test",
  };

  const unauthorizedUserResponse = await api.post("/api/auth/register").send({
    name: "unauthorized",
    email: "unauthorized@example.com",
    password: "unauthorized",
  });

  const unauthorizedToken = unauthorizedUserResponse.body.token;

  await api
    .patch(`/api/users/${userId}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${unauthorizedToken}`)
    .expect(401);
});

//delete a logged in user
// test("delete a logged in user", async () => {
//   const user = await User.findOne({}).select("_id");
//   const userId = user._id.toString();

//   await api
//     .delete(`/api/users/${userId}`)
//     .set("Authorization", `Bearer ${token}`)
//     .expect(200);
// });
// // delete a user internal server error
// test("cannot delete a user that does not exist", async () => {
//     const invalidUserId = "123456789012345678901234";

//     await api
//         .delete(`/api/users/${invalidUserId}`)
//         .set("Authorization", `Bearer ${token}`)
//         .expect(500);
// });

// //delete a user not found
// test("cannot delete a user that does not exist", async () => {
//     const user = await User.findOne({}).select("_id");
//     const userId = user._id.toString();

    
// });


afterAll(() => {
  mongoose.connection.close();
});
