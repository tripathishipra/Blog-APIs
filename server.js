const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()  
const url = process.env.DB_URL
app.use(express.json()) 
const bcrypt = require('bcrypt')
const register = require('./controllers/register.js')
const login = require('./controllers/login.js')
const { postcreate, postdelete , postupdate } = require('./controllers/post.js');
const authenticateToken = require('./middlewares/authenticate.js')
const refreshToken = require('./controllers/refreshToken.js')
const logout = require('./controllers/logout.js')


// database connection

mongoose.connect(url , {useNewUrlParser:true});
const con = mongoose.connection

con.on('open' , function(){
    console.log('connected.....')
})


// get request

app.get('/posts' , authenticateToken ,  async(req , res) => {
    res.json(posts.filter(post => post.username === req.user.username)) 
            

} ) 

// refresh token
app.post('/token' , refreshToken )


app.post('/register' , register)


app.post('/login' , login)


// post blog  
app.post('/postblog' , authenticateToken ,  postcreate)  


//logout request
app.delete('/logout' , logout )

//delete-post
app.delete('/post-delete/:id' , authenticateToken , postdelete  )

//update-post
app.patch('/post-update/:id', authenticateToken , postupdate )

app.listen(3000)