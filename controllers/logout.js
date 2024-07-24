const  User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const RefreshToken = require('../models/refreshtoken.js')

async function logout(req , res){

if(req.body.token == null) res.sendStatus(401)
  await RefreshToken.deleteOne({ token : req.body.token})
   res.sendStatus(204);
}



module.exports = logout