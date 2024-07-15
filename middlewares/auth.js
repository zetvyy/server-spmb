const response = require("../response");
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  if (!req.headers) {
    return response(400, "invalid", "Headers tidak ditemukan", res);
  }
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, "rahasia", (err, decoded) => {
      if (err) {
        return response(403, "invalid", "Token tidak valid", res);
      } else {
        req.user = decoded; // Menyimpan data pengguna ke request
        next();
      }
    });
  } else {
    return response(403, "invalid", "Token diperlukan!", res);
  }
};

module.exports = requireAuth;
