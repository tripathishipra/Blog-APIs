const User = require('../models/user.js')
 
 const bcrypt = require('bcrypt');
  async function register(req , res){
    try{
     const salt = await bcrypt.genSalt(); // rounds 10 default
     const hashpassword = await bcrypt.hash(req.body.password , salt)

     // fields to save
     const user = new User({   
        fullname : req.body.fullname,
        username: req.body.username,   
        password : hashpassword          
    })
    await user.save()
    res.json({"message":"User registered successfully"})

  
    }catch(err){
        res.send('Error' + err);
    }
   
}



module.exports = register