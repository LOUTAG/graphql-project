const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

const { generateToken } = require("../utils/generateToken");

module.exports = {
  createUser: async ({ userInput }, req) => {
    const { email, name, password } = userInput;
    try {
      const errors = [];
      /*** validate inputs ***/
      const nameRegex = /^(?=.{2,20}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      const emailRegex = /^[a-z0-9.-]+@+[a-z-]+[.]+[a-z]{2,6}$/;
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+=.<>_~]).{8,32}$/;
      if (!nameRegex.test(name)) errors.push({ message: "Invalid Name" });
      if (!emailRegex.test(email)) errors.push({ message: "Invalid Email" });
      if (!passwordRegex.test(password))
        errors.push({ message: "Invalid Password" });

      if (errors.length > 0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code = 422;
        throw error;
      }

      /*** email not already used ***/
      const existingUser = await User.findOne({ email: email });
      if (existingUser) throw new Error("email address already exists");
      const user = new User({
        email,
        name,
        password,
      });
      const createdUser = await user.save();
      return { ...createdUser._doc, _id: createdUser._id.toString() };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ email, password }, req) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("User not found");
        error.code = 404;
        throw error;
      }

      const checkPassword = await user.isPasswordMatched(password);
      if (!checkPassword) {
        const error = new Error("Incorrect password");
        error.code = 403;
        throw error;
      }
      const token = generateToken(user._id);
      return { token: token, userID: user._id.toString() };
    } catch (error) {
      throw error;
    }
  },
};
module.exports.createPost = async ({ postInput }, req) => {
  try {
    if (!req.isAuth) {
      const error = new Error("Not authenticated !");
      error.code = 401;
      throw error;
    }
    const errors = [];
    const { title, imageUrl, content, creator } = postInput;
    if (!title.length === 0 || title.length > 100)
      errors.push({ message: "Invalid title" });
    if (!imageUrl) errors.push({ message: "image is missing" });
    if (content.length === 0 || content.length > 4000)
      errors.push({ message: "Invalid content" });

    if (errors.length > 0) {
      const error = new Error("Invalid input");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const post = new Post({
      title,
      imageUrl,
      content,
      creator: mongoose.Types.ObjectId(req.userId),
    });
    const postSaved = await post.save();
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { post: postSaved } }
    );
    return {
      ...postSaved._doc,
      _id: postSaved._id.toString,
      createdAt: postSaved.createdAt.toString(),
      updatedAt: postSaved.updatedAt.toString(),
    };
  } catch (error) {
    throw error;
  }
};
module.exports.posts = async () => {
  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find().sort({ createdAt: -1 }).limit(8);
    return {
      posts: posts.map((item) => {
        return {
          ...item._doc,
          _id: item._id.toString(),
          createdAt: item.createdAt.toString(),
          updatedAt: item.updatedAt.toString(),
        };
      }),
      totalPosts: totalPosts,
    };
  } catch (error) {
    throw error;
  }
};
module.exports.allPosts = async ({page}) => {
  const pageSize = 4;
  if(!page) page = 1;
  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
    .sort({createdAt: -1})
    .skip(pageSize*(page-1))
    .limit(pageSize);
    return {
      posts: posts.map((post) => {
        return {
          ...post._doc,
          _id: post._id.toString(),
          createdAt: post.createdAt.toString(),
          updatedAt: post.updatedAt.toString(),
        };
      }),
      totalPosts: totalPosts,
      pages: Math.ceil(totalPosts/pageSize)
    };
  } catch (error) {
    throw error;
  }
};
