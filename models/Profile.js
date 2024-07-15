const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  imageUrl: {
    type: String,
  },
  nama: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  peminatan: {
    type: String,
    required: true,
  },
  keahlian: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Profile", profileSchema);
