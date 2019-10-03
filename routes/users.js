var express = require('express');
var router = express.Router();
const mongo = require('../bin/mongo');
const ObjectId = require('mongodb').ObjectId;

const defaultAvatar = "https://cdn2.vectorstock.com/i/thumb-large/20/76/man-avatar-profile-vector-21372076.jpg";





/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


//Nombre de contact
router.get('/', (req, res) => {
  mongo.getInstance().collection('contact').count();
});



//create contact
router.post('/', (req, res, next) => {
  mongo.getInstance().collection('contact').insertOne({
    name: req.body.name,
    phone: req.body.phone,
    mail: req.body.mail,
    description: req.body.description,
    avatar: defaultAvatar,
    creationDate: new Date(),
  })
});


//3 derniers contact
router.get('/', (req, res) => {
  mongo.getInstance().collection('contact').find({}).sort({ creationDate: -1 }).limit(3);
});


module.exports = router;
