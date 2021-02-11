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

var AuthController = require('./auth/AuthController')
app.use(slug +'/auth', AuthController);

var UsersController = require('./users/UsersController')
app.use(slug +'/users', UsersController);

var PreviewController = require('./preview/previewController')
app.use(slug +'/preview', PreviewController);


var PreviewController = require('./action/actionController')
app.use(slug +'/action', PreviewController);


var mailController = require('./mails/mailController')
app.use(slug + '/mails', mailController);

var carteController = require('./cartes/menuController')
app.use(slug + '/cartes', carteController);

var cityController = require('./city/cityController')
app.use(slug + '/city', cityController);

var commandController = require('./order/orderController')
app.use(slug + '/command', commandController)

var detailController = require('./detail/detailController')
app.use(slug + '/detail', detailController)

var itemsController = require('./items/itemsController')
app.use(slug + '/item', itemsController)

var assistantController = require('./assistant_carte/assistantController')
app.use(slug + '/assistant', assistantController)

var categoriesController = require('./category/categoryController')
app.use(slug + '/categories', categoriesController)

module.exports = app;
