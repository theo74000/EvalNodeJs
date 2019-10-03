var express = require('express');
var router = express.Router();
const mongo = require('../bin/mongo');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/contact";
const dbName = "contact";

/* GET home page. */

router.get('/', function (req, res, next) {
  mongo.getInstance().collection('contact').find().limit(50).toArray((err, contact) => {
    res.render('index', { title: 'contact', contact: contact });
  })
});


module.exports = router;
