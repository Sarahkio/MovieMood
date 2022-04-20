"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
const axios = require("axios");
const { MOVIE_API } = process.env;
const { genres } = require("../data");
// console.log(genres);
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
const ObjectId = require("mongodb").ObjectId;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signUp = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = uuidv4();
  const db = client.db("movies");

  let body = {
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    friends: [],
    comments: [],
    commentsLiked: [],
    commentsDisliked: [],
  };

  try {
    await client.connect();
    const query = { email: req.body.email };
    const queryUserName = { userName: req.body.userName };
    const user = await db
      .collection("users")
      .findOne({ $or: [query, queryUserName] });
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);
    if (user) {
      res.status(400).json({ status: 400, message: "users found" });
    } else {
      let users = await db
        .collection("users")
        .insertOne({ ...body, password: hashPassword });
      res.status(200).json({ status: 200, users, data: body });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const signIn = async (req, res) => {
  console.log("signin");
  //bycrypt.coommparre
  const client = new MongoClient(MONGO_URI, options);
  const _id = uuidv4();
  const db = client.db("movies");

  let body = {
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  try {
    await client.connect();
    const query = { email: req.body.email };
    const user = await db.collection("users").findOne(query);
    let hashPassword = await bcrypt.compare(req.body.password, user.password);
    if (hashPassword) {
      res.status(200).json({
        status: 200,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          friends: user.friends,
          comments: user.comments,
          commentsLiked: user.commentsLiked,
          commentsDisliked: user.commentsDisliked,
        },
        message: "valid password",
      });
    } else {
      res.status(400).json({ status: 400, message: "invalid password" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(404).json({ status: 404, message: "user doesn't exist" });
  } finally {
    client.close();
  }
};

module.exports = { signUp, signIn };
