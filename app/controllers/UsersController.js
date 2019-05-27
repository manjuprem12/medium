const express = require('express')
//const bcryptjs = require('bcryptjs')
const router = express.Router()
const {User} = require('../models/User')
const { authenticateUser } = require('../middlewares/authentication')
//localhost:3000/users/register
router.post('/register',function(req,res){
    const body = req.body
    const user = new User(body)
    //console.log(user.isNew) // will get true when register new
    user.save()
        .then(function(user){
      //      console.log(user.isNew) // will get false user registerd  is stored in db
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
   
})

//localhost:3000/users/login
router.post('/login',function(req,res){
    const body = req.body

    User.findByCredentials(body.email , body.password)
        .then(function(user){
           return user.generateToken()
           
        })
        .then(function(token){
            //res.setHeader('x-auth',token).send({})
            res.send({token})
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/users/account
router.get('/account',authenticateUser,function(req,res){
   const { user } = req
   res.send(user)
//res.send('success')
})


//localhost:3000/users/logout
router.delete('/logout',authenticateUser,function(req,res){
    const { user, token} = req
    User.findByIdAndUpdate(user._id ,{ $pull: {tokens: {token: token}}})
        .then(function(){
            res.send({notice:'successfully logged out'})
            })
            .catch(function(err){
                res.send(err)
            })
        
})

module.exports = {
    usersRouter : router
}
