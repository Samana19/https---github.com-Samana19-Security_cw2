const multer = require("multer");
const upload = require("../../middleware/upload");

// Mock the necessary dependencies
jest.mock("multer");

describe("Test multer file upload middleware", () => {
  test("should set up multer correctly", () => {
    // Assert that multer is called correctly
    expect(multer).toHaveBeenCalledWith({
      storage: expect.any(Object),
      fileFilter: expect.any(Function),
      limits: {
        fileSize: 3000000, // Assuming maxSize is 3000000
      },
    });
  });

  test("should only allow specific file extensions", () => {
    const fileFilterMock = jest.fn();
    // Reassign the fileFilter function from the mocked multer instance
    multer.mockImplementation(() => ({
      ...jest.requireActual("multer")(),
      fileFilter: fileFilterMock,
    }));

    // Simulate a valid image file
    const validImageFile = {
      originalname: "image.jpg",
      mimetype: "image/jpeg",
    };

    // Simulate an unsupported file
    const unsupportedFile = {
      originalname: "document.pdf",
      mimetype: "application/pdf",
    };

    // Test valid image file
    upload(null, validImageFile, () => {});
    expect(fileFilterMock).toHaveBeenCalledTimes(1);
    expect(fileFilterMock).toHaveBeenCalledWith(null, validImageFile, expect.any(Function));

    // Test unsupported file
    upload(null, unsupportedFile, (error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("File format not supported.");
    });
    expect(fileFilterMock).toHaveBeenCalledTimes(2);
    expect(fileFilterMock).toHaveBeenCalledWith(null, unsupportedFile, expect.any(Function));
  });
});
