const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  responses: {
    type: Map,
    of: String,
  },
});

module.exports = mongoose.model("Response", responseSchema);
