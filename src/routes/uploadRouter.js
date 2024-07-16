import * as dotenv from "dotenv";
dotenv.config();
import authenticateToken from "../middleware/authenticateToken.js";
import express from "express";
import multer from "multer";
import {
  S3Client
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as fs from "fs";
import * as path from "path";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const client = new S3Client({
  region: "hn",
  endpoint: process.env.END_POINT,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

router.post("/", authenticateToken, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const bucketName = "bucket-xichtho";
    const folderName = "automatrix/";

    if (!file) {
      return res.status(400).json({ error: "Vui lòng chọn file để upload." });
    }

    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileNameWithoutExtension = path.basename(
      file.originalname,
      fileExtension
    );
    const fileName = `${fileNameWithoutExtension}${fileExtension}`;
    const uploadParams = {
      Bucket: bucketName,
      Key: `${folderName}${fileName}`,
      Body: fs.createReadStream(file.path),
      ACL: "public-read",
      ContentType: file.mimetype,
    };

    const parallelUploads3 = new Upload({
      client: client,
      params: uploadParams,
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await parallelUploads3.done();

    const fileUrl = `https://${bucketName}.hn.ss.bfcplatform.vn/${uploadParams.Key}`;

    fs.unlinkSync(file.path);

    res.json({
      message: "Upload file thành công.",
      url: fileUrl,
      fileName: fileName,
      fileExtension: fileExtension,
    });
  } catch (err) {
    console.error("Lỗi khi upload file:", err);
    res.status(500).json({ error: "Đã có lỗi xảy ra." });
  }
});

export default router;