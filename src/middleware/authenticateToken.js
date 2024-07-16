import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  // Kiểm tra cookie có token hay không
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Thiếu token xác thực" });
  }

  try {
    // Giải mã token
    const decoded = jwt.decode(token);

    // Kiểm tra thời gian sống của token
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token đã hết hạn" });
    }

    // Kiểm tra tính hợp lệ của token (chữ ký)
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }

      // Lưu thông tin
      req.user = user;

      next();
    });
  } catch (error) {
    console.error("Lỗi xử lý token:", error);
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
}
