const RefreshToken = require('../models/refreshtoken.js')
const jwt = require('jsonwebtoken')
require('dotenv').config() 

async function refreshTokencreation (req , res){
    try{
    const refreshT =  req.body.token  
    if(refreshT == null) return res.sendStatus(401);    // 401 unauthorised
    const token =  await RefreshToken.findOne({
       token : refreshT
    })
    console.log(token.token)
    if(token == null) return res.sendStatus(403);       // 403 forbidden

    jwt.verify(refreshT , process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        const accesstoken = jwt.sign({ id : user.id} , process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn : '60s'} )
        res.json({accessToken : accesstoken  });
    }) 
    
    }catch(err){
    return res.sendStatus(404);
    }
}

module.exports = refreshTokencreation;


