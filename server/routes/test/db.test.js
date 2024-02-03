const mongoose = require('mongoose');
const connectDB = require('../../config/db');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Test MongoDB connection', () => {
  beforeEach(() => {
    mongoose.connect.mockClear();
  });

  test('connect function is defined', () => {
    expect(connectDB).toBeDefined();
  });

  test('connects to MongoDB', async () => {
    mongoose.connect.mockResolvedValue();
    
    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith("mongodb://127.0.0.1:27017/bookcommunity");
  });

  test('throws an error if connection fails', async () => {
    mongoose.connect.mockRejectedValue(new Error());

    try {
      await connectDB();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
