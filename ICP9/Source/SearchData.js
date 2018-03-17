/*
 * Created by mnpw3d on 20/10/2016.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://ruthvic:ruthvic@ds115569.mlab.com:15569/db1ase';

MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("connect to server");
    var db = client.db('db1ase');
    findUserwithMobile(db, function() {
        db.close();
    });
});

var findUserwithMobile = function(db,callback) {
    console.log("finding user with the mobile number");
    var cursor = db.collection('ruth_ase').find({"basicInfo.mobile":"7777777777"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name : " + doc.basicInfo.fName);
            console.log("Last Name : " + doc.basicInfo.lName);
            console.log("city : " + doc.basicInfo.city);
            console.log("user Id : " + doc.basicInfo.userId);
            console.log("Mobile : " + doc.basicInfo.mobile);
        }
    });
}

var findUser = function(db, callback) {
    var cursor =db.collection('demoase').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
var findUserwithName = function(db,callback) {
    var cursor = db.collection('demoase').find({"fname":"Sidrah"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            console.log("Last Name:" + doc.lname);
            console.log("city:" + doc.address.city);
        }
    });
}


var findUserwithUniversity = function(db, callback) {
    var cursor = db.collection('demoase').find({"education.university":"UMKC"});
    cursor.each(function(err,doc){
       assert.equal(err,null);
       if(doc != null)
       {
           console.log("First Name:" + doc.fname);
           console.log("University:" + doc.education.university);
           console.log("Degree:" + doc.education.degree);
           console.log("Major:" + doc.education.major);
           console.log("mail:" + doc.mail);
       }
    });
}
