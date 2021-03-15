var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions)); 

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

// app.post('/api/auth/testtoken', function(req, res) {
//   const body = req.body;

//   const user = USERS.find(user => user.username == body.username);
//   if(!user || body.password != 'todo') return res.sendStatus(401);
  
//   var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
//   res.send({token});
// });

app.get(slug +'/', function (req, res) {
  res.render('./dist/index.html', {});
});

var QuizController = require('./quizController')
app.use(slug +'/quiz', QuizController);

module.exports = app;
