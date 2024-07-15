var express = require("express");
var router = express.Router();
const requireAuth = require("../middlewares/auth");
const userController = require("../controllers/userController");
const tokenContoller = require("../controllers/tokenController");

router.get("/getUsers", userController.getUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginAction);
// router.get("/token", requireAuth, tokenContoller.getToken);
router.post("/refresh-token", tokenContoller.refreshToken);
router.post("/logout", requireAuth, userController.actionLogout);

module.exports = router;
