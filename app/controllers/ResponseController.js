const express = require('express')
const router = express.Router()
const {Response} = require('../models/Response')
const {authenticateUser} = require('../middlewares/authentication')
const {Story} = require('../models/Story')

router.get('/:id', function(req,res){
    const id = req.params.id
    console.log(id)
    Story.findById(id).populate('responses.user')
        .then(function(story){
            res.send(story.responses)
        })
        .catch(function(err){
            res.send(err)
        })
})


router.post('/:id',authenticateUser,function(req,res){
    const id = req.params.id
    const { user } = req
    const body = req.body
    const response = new Response(body)
    response.user = user._id
    Story.findById(id)
        .then(function(story){
            story.responses.push(response)
            story.save()
                .then(function(story){
                    res.send(story.responses)
                })
                .catch(function(err){
                    res.send(err)
                })
            
        })           
        .catch(function(err){
            res.send(err)
        })
  
})

module.exports = {
    responseRouter : router
}

// router.get('/:id',authenticateUser,function(req,res){
//     const id = req.params.id
//     Response.findById({
//         user : req.user._id,
//         _id : id
//     })
//         .then(function(response){
//             if(response){
//                 res.send(response)
//             }
//             else {
//                 res.send({})
//             }
//         })
//         .catch(function(err){
//             res.send(err)
//         })

// })

// router.put('/:id', authenticateUser,function(req,res){
//     const id = req.params.id
//     const body = req.body
//     Response.findByIdAndUpdate({user : req.user._id,
//          _id : id},
//          {$set: body}, {new:true, runValidators: true})
//         .then(function(response){
//             res.send(response)
//         })
//         .catch(function(err){
//             res.send(err)
//         })

// })

