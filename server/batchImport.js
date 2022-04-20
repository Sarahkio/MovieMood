const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movies");
    const genres = await db.collection("genres").insertMany();
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};
batchImport();
