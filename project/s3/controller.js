const dotenv = require("dotenv");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = require("./routing");
const { S3Client } = require("@aws-sdk/client-s3");

dotenv.config({ path: ".env" });

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESSKEY, // store it in .env file to keep it safe
    secretAccessKey: process.env.ACCESSSECRET,
  },
  region: process.env.REGION, // this is the region that you select in AWS account
});

class UploadController {
  async uploadData(req, res) {
    console.log(req.file);
    res.send(req.file)
  }

  async list(req, res) {
    try {
      let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
      let x = r.Contents.map((item) => item.key);
      res.send(x);
    } catch (err) {
      console.log(err);
    }
  }

  async download(req, res) {
    try {
      const filename = req.params.filename;
      let x = await s3.getObject({ Bucket: BUCKET, key: filename }).promise();
      res.send(x.Body);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req, res) {
    try {
      const filename = req.params.filename;
      await s3.deleteObject({ Bucket: BUCKET, key: filename }).promise();
      res.send("File deleted successfully");
    } catch (err) {
      console.log(err);
    }
  }
}

class UploadControllers {
  constructor() {
    this.uploadFiles = new UploadController();
    console.log("api failed");
  }
}

module.exports = UploadControllers;
