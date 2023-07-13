const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const Controller = require("./controller");
const obj = new Controller();

const s3 = new S3Client({
  credentials: {
    accessKeyId: "AKIAQNO6IHOYTJF4HHGS",
    secretAccessKey: "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",
  },
  region: "us-east-1",
});

const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: "mandi-storage", // change it as per your project requirements
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read", // storage access type
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
  },
});

// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
  return cb(null, true);
  // Define the allowed extension
  //   const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  //   // Check allowed extensions
  //   const isAllowedExt = fileExts.includes(
  //     path.extname(file.originalname.toLowerCase())
  //   );

  //   // Mime type must be an image
  //   const isAllowedMimeType = file.mimetype.startsWith("image/");

  //   if (isAllowedExt && isAllowedMimeType) {
  //     return cb(null, true); // no errors
  //   } else {
  //     // pass error msg to callback, which can be displaye in frontend
  //     cb("Error: File type not allowed!");
  //   }
}

// our middleware
const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (req, file, callback) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 2mb file size
  },
});

router.post(
  "/s3/upload",
  uploadImage.single("image"),
  obj.uploadFiles.uploadData
);
router.post("/s3/list", obj.uploadFiles.list);
router.post("/s3/download", obj.uploadFiles.download);
router.post("/s3/delete", obj.uploadFiles.delete);

module.exports = router;
