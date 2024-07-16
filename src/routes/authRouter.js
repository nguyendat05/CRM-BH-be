import express from "express";
import {
  generateAuthUrl,
  handleOAuth2Callback,
} from "../authenticationType/google.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { User } from "../postgres/postgres.js";

const router = express.Router();

router.get("/login", (req, res) => {
  const url = generateAuthUrl();
  res.redirect(url);
});

router.get("/oauth2callback", handleOAuth2Callback);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logout successful" });
});

router.get("/profile", authenticateToken, async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  res.status(200).json({
    name: user.name,
    picture: user.picture,
  });
});

export default router;
