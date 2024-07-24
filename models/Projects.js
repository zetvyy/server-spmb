const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
  imageUrl: {
    type: String,
  },
  nama: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Projects", projectsSchema);
