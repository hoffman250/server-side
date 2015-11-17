
// express, handlebar and body parser code from lecture
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);		// changed to port 3030 for final assignment code

// get handler modified from lecture to work on default webpage
app.get('/',function(req,res){
  	var context = {};
	context.count = req.session.count || 0;
	req.session.count = context.count + 1;
	res.render('counter', context);
});

// post handler modified from lecture to work on default webpage
app.post('/', function(req,res){
  	var context = [];
	if(req.body.command === "resetCount"){
		//req.session.count = 0;
		req.session.destroy();
	}
	else {
		context.err = true;
	}
	if(req.session){
		context.count = req.session.count;
	}
	else {
	context.count = 0;
	}
	req.session.count = context.count + 1;
	res.render('counter', context);
});

// default 404 handler from lecture
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// default 500 handler from lecture
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
