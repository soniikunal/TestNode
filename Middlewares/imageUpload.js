import multer from "multer";

// Set up multer storage
const storage = multer.memoryStorage(); // Use memory storage for storing image in memory

// Set up multer instance
const upload = multer({ storage: storage });

// Middleware for handling single image uploads
const imageUpload = (fieldName) => {
  return upload.single(fieldName);
};

export { imageUpload };
