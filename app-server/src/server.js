// ./app-server/src/server.js file:
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb'); // Update this line
const app = express();
const cors = require('cors');

const mongoURL = process.env.MONGO_DB_URL;
const listenPort = process.env.BUSINESS_TIER_CONTAINER_PORT;
const dbName = process.env.MONGO_INITDB_DATABASES;
const dbCollection = process.env.MONGO_INITDB_COLLECTION;

app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

console.log("MongoDB URL:", mongoURL);
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.get('/', async function (req, res) { // Update this line
  let response = [];

  try {
    const client = await MongoClient.connect(mongoURL, mongoClientOptions);
    const db = client.db(dbName);
    const result = await db.collection(dbCollection).find({}).toArray();
    response = result;
    client.close();
  } catch (err) {
    console.error(err);
    throw err;
  }

  res.send(response ? response : []);
});

app.listen(listenPort, function () {
  console.log("app listening on port:", listenPort);
});
