const response = require("../response");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.find();
      for (let i = 0; i <= user.length; i++) {
        if (user[i].refreshToken !== "") {
          return res.status(200).json(user[i]);
        }
      }
    } catch (error) {
      return res.redirect("/");
    }
  },

  registerUser: async (req, res) => {
    const { email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    let pass = password.toString();
    const hashPassword = await bcrypt.hash(pass, salt);

    try {
      const dataUser = await User.create({
        email: email,
        password: hashPassword,
        role: role,
      });

      if (email !== "" && password !== "" && role !== "") {
        response(200, dataUser, "Register Successfully", res);
      } else {
        response(400, "invalid", "Form cannot be empty", res);
      }
    } catch (error) {
      response(500, "invalid", "Register Failed", res);
    }
  },

  loginAction: async (req, res) => {
    const saveRefreshToken = async (userId, refreshToken) => {
      try {
        await User.findByIdAndUpdate(userId, { refreshToken: refreshToken });
      } catch (error) {
        console.error("Error saving refresh token:", error);
        throw new Error("Unable to save refresh token.");
      }
    };
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      const generateTokens = (user) => {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email },
          "accessSecret",
          { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
          { id: user.id, email: user.email },
          "refreshSecret",
          { expiresIn: "7d" }
        );
        return { accessToken, refreshToken };
      };

      if (!user) {
        return response(
          404,
          "invalid",
          "User yang anda masukkan tidak ada!",
          res
        );
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return response(
          404,
          "invalid",
          "Password yang anda masukkan tidak cocok!",
          res
        );
      } else {
        const { accessToken, refreshToken } = generateTokens(user);
        await saveRefreshToken(user._id, refreshToken);
        response(
          200,
          { accessToken: accessToken, refreshToken: refreshToken },
          "Login Successfully",
          res
        );
        localStorage.setItem("email", email);
      }
    } catch (error) {
      response(500, "invalid", "Login Failed", res);
    }
  },
  actionLogout: async (req, res) => {
    const { refreshToken } = req.body;
    const removeRefreshToken = async (refreshToken) => {
      try {
        await User.updateOne(
          { refreshToken: refreshToken },
          { $unset: { refreshToken: "" } }
        );
      } catch (error) {
        console.error("Error removing refresh token:", error);
        throw new Error("Unable to remove refresh token.");
      }
    };
    try {
      await removeRefreshToken(refreshToken);
      response(200, refreshToken, "Logut berhasil!", res);
    } catch (error) {
      response(500, "invalid", "Logut gagal!", res);
    }
  },
};
