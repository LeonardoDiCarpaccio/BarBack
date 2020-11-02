var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors()); 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.header("Content-Type", "application/*+json");
  req.header("Accept", "application/json");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));           
app.use(bodyParser.json());
app.use(express.static('./dist/')); //permet d'aller recuperer le front builder dans le dossier dist du back

const slug = '/api/v1';

app.get(slug +'/', function (req, res) {
  res.render('./dist/index.html', {});
});

var AuthController = require('./auth/AuthController')
app.use(slug +'/auth', AuthController);

var UsersController = require('./users/UsersController')
app.use(slug +'/users', UsersController);

var questionController = require('./questions/questionController')
app.use(slug + '/question', questionController);

var vinscontroller = require('./vins/vinsController')
app.use(slug + '/vins',vinscontroller)


module.exports = app;
