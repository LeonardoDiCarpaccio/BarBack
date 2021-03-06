var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  console.log(token)
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.role = decoded.role
    req.userId = decoded.userId
    next();
  });

  
}

module.exports = verifyToken;