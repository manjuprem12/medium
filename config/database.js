const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/Medium',{useNewUrlParser : true})
    .then(function(){
        console.log("connected to db")
    })
    .catch(function() {
        console.log("Opps something went wrong on connection")
    })
   module.exports = {
       mongoose
   }