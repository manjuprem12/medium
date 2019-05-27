const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {responseSchema} = require('./Response')

const storySchema = new Schema ({
    title : {
        type : String,
        required : true ,
       // unique : true
    },
    body : {
        type : String,
        required : true,
        //unique : true
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    },
    user : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    tag : [{
            type : Schema.Types.ObjectId,
            ref:'Tags'
        }],
    topic:{
            type : Schema.Types.ObjectId,
            ref : 'Topic'
        },
    
   
    responses : [responseSchema]
    

    // isPublished : {
    //     type : Boolean
    // },
    // publishedDate : {
    //     type: Date,
    //     default : Date.now
    // },
    // previewImageUrl : {
    //     type : String,
    //     required : true,
    //     unique : true
    // } 
})
const Story = mongoose.model('Stories',storySchema)
module.exports = {
    Story
}