var express = require('express')
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
})

app.listen(port, function() {
	console.log('app running')
})

/*

Open terminal and execute these commads starting
--->$ git init
--->$ git add .
--->$ heroku --version
--->$ heroku login
Enter your Heroku credentials:
    Email: rnd95@mail.umkc.edu
Password: *********
Logged in as rnd95@mail.umkc.edu
--->$ heroku local web
--->$ git add .
--->$ git commit -am "lab 10"
--->$ heroku create

 git push --set-upstream https://git.heroku.com/rocky-coast-70552.git master


 https://rocky-coast-70552.herokuapp.com/

*/