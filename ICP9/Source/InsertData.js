/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://ruthvic:ruthvic@ds115569.mlab.com:15569/db1ase';

var insertDocument = function(db, callback) {
    db.collection('ruth_ase').insertOne( {
        "basicInfo" : {
        "fName" : "ruth",
        "lName" : "punya",
        "city" : "hyderabad",
        "mobile":"9999999999"
        }
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the ruth_ase collection.");
       // callback();
    });
};
MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("connect to server");
    var db = client.db('db1ase');
    insertDocument(db, function() {
        db.close();
    });
});