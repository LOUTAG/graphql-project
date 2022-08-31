const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is missing"],
    },
    content: {
      type: String,
      required: [true, "Content is missing"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator is missing"],
    },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
