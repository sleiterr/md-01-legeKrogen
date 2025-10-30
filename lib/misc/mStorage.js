const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(
  __dirname,
  "../../sites/www/legekrogen/public/users"
);

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath), { recursive: true };
}

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "_" + Date.now() + ext;
    cb(null, name);
  },
});

module.exports = userStorage;

// mStorage.js - Multer storage setup for user file uploads.

// Configures where and how uploaded files (e.g., user avatars) are saved:
// - Stores files in 'public/users' folder (creates it if missing).
// - Generates unique filenames using field name + timestamp + original extension.

// Frontend should send files via FormData with matching field names.
// Note: 'cb(null, name)' must be used in filename callback.
