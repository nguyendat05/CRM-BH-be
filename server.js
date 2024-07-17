import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./src/routes/authRouter.js";
import sheetRouter from "./src/routes/sheetRouter.js";
import hqRouter from "./src/routes/hqRouter.js";
import zaloRouter from "./src/routes/zaloRouter.js";
import githubWebhook from "./src/middleware/githubWebhook.js";
import { connection, } from "./src/postgres/postgres.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const whitelist = [
  process.env.URL_CLIENT
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRouter);

app.use("/api/sheet", sheetRouter);
app.use("/api/hq", hqRouter);
app.use("/api/zalo", zaloRouter);

app.post("/git/update", githubWebhook, (req, res) => {
  return res.status(200).send("Webhook received");
});


app.listen(PORT, async () => {
  try {
    await connection();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
});
