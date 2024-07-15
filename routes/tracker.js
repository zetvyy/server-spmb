var express = require("express");
const trackerController = require("../controllers/trackerController");
var router = express.Router();

router.get("/profile", trackerController.getProfile);
router.post("/add-profile", trackerController.addProfile);
router.put("/edit-profile", trackerController.editProfile);

router.get("/project", trackerController.getProject);
router.post("/add-project", trackerController.addProjects);

router.get("/topic", trackerController.getTopic);
router.post("/add-topic", trackerController.addTopic);

module.exports = router;
