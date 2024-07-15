var express = require("express");
const responseController = require("../controllers/responseController");
var router = express.Router();

router.post("/submit-form", responseController.responseForm);

module.exports = router;
