const jwt = require("jsonwebtoken");

module.exports = {
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token diperlukan" });
    }

    try {
      const decoded = jwt.verify(refreshToken, "refreshSecret");
      const newTokens = generateTokens({
        id: decoded.id,
        email: decoded.email,
      });
      // Update refresh token di database jika perlu
      res.json(newTokens);
    } catch (error) {
      return res.status(403).json({ message: "Refresh Token tidak valid" });
    }
  },
  getToken: (req, res) => {
    const { accessToken, refreshToken } = req.user;
    if (!accessToken || !refreshToken) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }
    res.status(200).json({ accessToken, refreshToken });
  },
};
