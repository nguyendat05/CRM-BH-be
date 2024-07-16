import * as dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";
import { User } from "../postgres/postgres.js";
import url from "url";
import jwt from "jsonwebtoken";

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URIS
);

export const generateAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "consent",
  });
};

export const handleOAuth2Callback = async (req, res) => {
  try {
    const qs = new url.URL(req.url, process.env.URL_BACKEND).searchParams;
    const code = qs.get("code");

    const { tokens } = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials(tokens);

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email, name, picture } = ticket.getPayload();

    let existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(403).send(`
        <!DOCTYPE html>
      <html>
      <head>
        <title>Truy cập bị từ chối</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #d35400; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Truy cập bị từ chối</h1>
          <p>Email: <strong>${email}</strong></p>
          <p>không được phép truy cập ứng dụng.</p>
          <a href="${process.env.URL_CLIENT}">Truy cập lại</a>
          <p>hoặc liên hệ với Admin.</p>
        </div>
      </body>
      </html>
          `);
    }

    existingUser.id = sub;
    existingUser.name = name;
    existingUser.picture = picture;
    await existingUser.save();

    const payload = {
      id: existingUser.id,
    };
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: "8h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.redirect(`${process.env.URL_CLIENT}/login-success`);
  } catch (e) {
    console.error(e);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Lỗi Server</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #d35400; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Lỗi Server</h1>
          <p>Đã xảy ra lỗi trong quá trình đăng nhập</p>
          <a href="${process.env.URL_CLIENT}">Truy cập lại</a>
        </div>
      </body>
      </html>
    `);
  }
};
