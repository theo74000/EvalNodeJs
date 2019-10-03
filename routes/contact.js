var express = require('express');
var router = express.Router();
const mongo = require('../bin/mongo');
const ObjectId = require('mongodb').ObjectId;

const defaultAvatar = "https://cdn2.vectorstock.com/i/thumb-large/20/76/man-avatar-profile-vector-21372076.jpg";


//contact detail
router.get('/:id', (req, res) => {
    mongo.getInstance().collection('contact').findOne(
        { _id: ObjectId(req.params.id) },
        (err, result) => {
            if (err) throw err;
            res.send({ ok: true, result: result });
        });
});




//delete contact
router.delete('/:id', (req, res) => {
    mongo.getInstance()
        .collection('contact')
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: { archive: true } }, (err, result) => {
            res.send({ ok: true });
        });
});

//update contact
router.put('/:id', (req, res, next) => {
    var datas = {};
    var properties = ['name', 'phone', 'mail', 'description', 'avatar'];
    for (var i in properties) {
        if (req.body[properties[i]]) {
            datas[properties[i]] = req.body[properties[i]];
        }
    }
    mongo.getInstance().collection("contact").updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: datas },
        function (err, res) {
            if (err) throw err;
        });
});



module.exports = router;
