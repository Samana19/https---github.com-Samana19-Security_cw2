const supertest = require("supertest");
const app = require("../../app");
const { default: mongoose } = require("mongoose");
const User = require("../../models/User");

const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
});

let token = null;



test("user can be registered", async () => {
  const newUser = {
    name: "test",
    email: "test@gmail.com",
    password: "test",
  };

  await api.post("/api/auth/register").send(newUser).expect(200);
});

test("user cannot be registered with invalid email", async () => {
  const newUser = {
    name: "test",
    email: "test",
    password: "test",
  };

  await api.post("/api/auth/register").send(newUser).expect(400);
});


// it('should return a 500 error when an internal server error occurs', async () => {
//   jest.spyOn(User, 'create').mockImplementation(() => {
//     throw new Error('Simulated error');
//   });

//   const response = await api
//     .post('/api/auth/register')
//     .send({
//       name: 'test',
//       email: 'test@gmail.com',
//       password: 'test',
//     });

//   expect(response.status).toBe(500);
//   expect(response.body.error).toBe('Internal Server Error');
// });




test("login successful", async () => {
  response = await api
    .post("/api/auth/login")
    .send({
      email: "test@gmail.com",
      password: "test",
    })
    .expect(200);

  console.log(response.body);
  token = response.body.token;
});

test("invalid credentials", async () => {
  response = await api
    .post("/api/auth/login")
    .send({
      email: "test",
      password: "wrongpassword",
    })
    .expect(401);
  expect(response.statusCode).toBe(401);
});

// test("duplicate users cannot be registered", async () => {
//   const response = await api
//     .post("/api/auth/register")
//     .send({
//       username: "test",
//       email: "test@gmail.com",
//       password: "test",
//     })
//     .expect(400);
// });

afterAll(async () => {
  await User.deleteMany({});
  // await api.post("/auth/logout").set("Authorization", `bearer ${token}`);
  await mongoose.connection.close();
});