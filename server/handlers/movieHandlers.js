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

const getGenres = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // console.log("starting connection");
    await client.connect();
    const db = client.db("movies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API}`
    );
    if (response) {
      res.status(200).json({ status: 200, data: response.data.genres });
    } else {
      res.status(400).json({ status: 400, message: "genres not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const getGenre = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const page = req.query.page || 1;
  const name = req.params.name;
  const names = req.params.names.split(",");
  try {
    await client.connect();
    const db = client.db("movies");
    let genreList = genres
      .filter((genre) => {
        return names.includes(genre.id.toString());
      })
      .map((genre) => {
        return genre.id;
      })
      .join(",");
    // console.log("hello, ", genreList);
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API}&page=${page}&with_genres=${genreList}`
    );
    // console.log(response.data.results);
    if (response) {
      res.status(200).json({
        status: 200,
        data: response.data.results,
        total_pages: response.data.total_pages,
      });
    } else {
      res.status(400).json({ status: 400, message: "No movies found" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.stack });
  } finally {
    client.close();
  }
};

// details
const getMovie = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;

  try {
    // console.log("starting connection");
    await client.connect();
    const db = client.db("movies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API}`
    );
    // console.log(response.data);
    if (response) {
      res.status(200).json({ status: 200, data: response.data });
    } else {
      res.status(400).json({ status: 400, message: "movie details not found" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

module.exports = { getGenres, getGenre, getMovie };
