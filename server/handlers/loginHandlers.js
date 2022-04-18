// "use strict";
// // use this package to generate unique ids: https://www.npmjs.com/package/uuid
// const { v4: uuidv4 } = require("uuid");

// const { MongoClient } = require("mongodb");
// const axios = require("axios");
// const { MOVIE_API } = process.env;
// const { genres } = require("./data.js");
// // console.log(genres);
// const bcrypt = require("bcryptjs");

// require("dotenv").config({ path: "./.env" });
// const { MONGO_URI } = process.env;
// const ObjectId = require("mongodb").ObjectId;

// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const signUp = async (req, res) => {
//   const client = new MongoClient(MONGO_URI, options);
//   const _id = uuidv4();
//   const db = client.db("movies");
//   //   const password = req.body.password;
//   //   const confirmPassword = req.body.confirmPassword;

//   let body = {
//     _id: req.body._id,
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     // userName: req.body.userName,
//     userName: req.body.userName,
//     email: req.body.email,
//     friends: [],
//     comments: [],
//     // postLikes: 0,
//     // postDisLikes: 0,
//     commentsLiked: [],
//     commentsDisliked: [],
//     // password: req.body.password,
//   };

//   //   console.log("this is hashpassowrd", hashPassword);
//   try {
//     await client.connect();
//     const query = { email: req.body.email };
//     const queryUserName = { userName: req.body.userName };
//     const user = await db
//       .collection("users")
//       .findOne({ $or: [query, queryUserName] });
//     let salt = await bcrypt.genSalt(10);
//     let hashPassword = await bcrypt.hash(req.body.password, salt);
//     if (user) {
//       res.status(400).json({ status: 400, message: "users found" });
//     } else {
//       let users = await db
//         .collection("users")
//         .insertOne({ ...body, password: hashPassword });
//       res.status(200).json({ status: 200, users, data: body });
//     }
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ status: 500, message: "unknown error" });
//   } finally {
//     client.close();
//   }
// };

// module.exports = { signUp };
