// ./app-server/src/mongodb-service.js file:

// const { MongoClient } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

class MongoDBService {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.options = { useNewUrlParser: true, useUnifiedTopology: true };
    this.client = null;
    this.db = null;
  }

  async connect() {
    this.client = await MongoClient.connect(this.url, this.options);
    this.db = this.client.db(this.dbName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }

  async find(collectionName, query = {}) {
    return this.db.collection(collectionName).find(query).toArray();
  }
}

module.exports = MongoDBService;
