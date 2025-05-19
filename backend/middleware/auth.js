const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const authMid = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Erişim için Login olunuz" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    if (!user) {
      return res.status(403).json({ message: "Kullanıcı bulunamadı" });
    }

    // req.user'ı ata
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};

const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(500).json({ message: "Giriş izniniz bulunmamaktadır" });
    }
    next();
  };
};
module.exports = { authMid, roleChecked };
