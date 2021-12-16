// models/card.js
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) =>
        /[(http|https)://(www.)?a-zA-Z0-9.-]+\.[a-z]{2,6}(\/[a-zA-Z0-9.-~:/?%#[\]@!$&'()*+,;=]*)?/.test(
          v
        ),
      message: "please enter a valid URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("card", cardSchema);
