const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/contact";
const dbName = "contact";

class Mongo {
    constructor() {
        if (!MongoClient) {
            MongoClient.connect(url,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    if (err) throw err;
                    Mongo.instance = client.db(dbName);
                    console.log('Mongo connect');
                });
        }
    }
    getInstance() {
        return Mongo.instance;
    }
}

module.exports = new Mongo();