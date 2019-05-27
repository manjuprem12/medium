const mongoose = require('mongoose')
const Schema =  mongoose.Schema
const tagSchema = new Schema ({
  tags : {
      type : [String],
      required : true
      
  }  
})
const Tags = mongoose.model('Tags',tagSchema)
module.exports = {
    Tags
}