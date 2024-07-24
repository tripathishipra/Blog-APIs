const mongoose = require('mongoose');

const refreshToken = mongoose.Schema({
 token : {
    type : String,
    unique: true,

 } 

} , {timestamps : true})


module.exports = mongoose.model('RefreshToken' ,  refreshToken );
