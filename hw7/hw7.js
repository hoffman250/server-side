var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

// get handler modified from lecture to work on default webpage
// 
app.get('/',function(req,res){
  var dataArray = [];
  for (var p in req.query){
    dataArray.push({'name':p,'value':req.query[p]})
  }
  var obArray = {};
  obArray.getData = dataArray;
  res.render('get-request', obArray);
});

// post handler modified from lecture to work on default webpage
app.post('/', function(req,res){
  var dataArray = [];
  for (var p in req.body){
    dataArray.push({'name':p,'value':req.body[p]})
  }
  console.log(dataArray);
  console.log(req.body);
  var obArray = {};
  obArray.getData = dataArray;
  res.render('post-request', obArray);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
