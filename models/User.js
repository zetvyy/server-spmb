const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: "",
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  projectsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projects",
  },
});

module.exports = mongoose.model("User", userSchema);
