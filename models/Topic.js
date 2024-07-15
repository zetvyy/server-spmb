const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
  topikPembelajaran: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Topic", topicSchema);
