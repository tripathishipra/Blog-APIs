const  User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const RefreshToken = require('../models/refreshtoken.js')


async function login(req , res){

const loginuser = await User.findOne({
    username : req.body.username,
})


 if(loginuser == null) return res.sendStatus(404)
 try{
if( await bcrypt.compare(req.body.password , loginuser.password)){
    const user  = {
        id : loginuser.id
     
       }
     
       const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET_KEY , { expiresIn: '60s' } ) // sign fn - generate the token
       const refreshToken = jwt.sign(user , process.env.REFRESH_TOKEN_SECRET_KEY  ) 
       const token = new RefreshToken({
        token : refreshToken
       })
       await token.save()
       res.json({
        accessToken : accessToken,
        refreshToken : refreshToken
       }) 
}
}catch(err){
    return res.sendStatus(404);
}
   
}


module.exports = login
