const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    date: {
      type: String,
      default: Date()
    }
  }
);

module.exports = mongoose.model("category", categorySchema);