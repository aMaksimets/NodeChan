const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const { check, oneOf, validationResult } = require('express-validator');

mongoose.connect('mongodb://localhost/nodekb', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
let db = mongoose.connection;

//check connection
db.once('open', function(){
	console.log('Connected to MongoDB');
});

//error check
db.on('error', function(err){
	console.log(err);
});

//init
const app = express();

//bring in modules
let Thread = require('./models/thread')

//engine view load
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// BODY PARSER MIDDLE 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// express session MID
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// express message MID
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express validator
// app.post('/thread/add', oneOf([
//   check('programming_language').isIn(['javascript', 'java', 'php']),
//   check('design_tools').isIn(['canva', 'photoshop', 'gimp'])
// ]), (req, res, next) => {
//   try {
//     validationResult(req).throw();
//   } catch (err) {
//   	return;
//   }
// });

//home route
app.get('/', function(req, res){
	Thread.find({}, function(err, threads){
		if(err){
			console.log(err);
		}else{
			res.render('index', {
				title:'Threads',
				threads: threads
			});
		}
	});
});

// get thread
app.get('/thread/:id', function(req, res){
	Thread.findById(req.params.id, function(err, thread){
		res.render('thread', {
			thread:thread
		});
	});
});

// create route
app.get('/threads/add', function(req, res){
	res.render('add_thread', {
		title:'Add thread'
	});
});

// add submit post route
app.post('/threads/add', function(req, res){
	// check('name').isLength({min:3})

	let thread = new Thread();
	thread.name = req.body.name;
	thread.pname = req.body.pname;
	thread.body = req.body.body;
	thread.board = req.body.board;

	thread.save(function(err){
		if(err){
			console.log(err);
			return;
		} else{
			req.flash('success', 'Thread created');
			res.redirect('/');
		}
	});
});

// load edit form
app.get('/thread/edit/:id', function(req, res){
	Thread.findById(req.params.id, function(err, thread){
		res.render('edit_thread', {
			title:'Edit thread',
			thread:thread
		});
	});
});

// update submit post route
app.post('/threads/edit/:id', function(req, res){
	let thread = {};
	thread.name = req.body.name;
	thread.pname = req.body.pname;
	thread.body = req.body.body;
	thread.board = req.body.board;

	let query = {_id:req.params.id}

	Thread.updateOne(query, thread, function(err){
		if(err){
			console.log(err);
			return;
		} else{
			res.redirect('/');
		}
	});
});

app.delete('/thread/:id', function(req,res){
	let query = {_id:req.params.id}

	Thread.remove(query, function(err){
		if(err){
			console.log(err);
		}
		res.send('Success');
	});
});

app.listen(3000, function(){
	console.log('starting node app on port: 3000..');
});