const express = require('express')
const router= express.Router()
const { Story } = require('../models/Story')

const { authenticateUser } = require('../middlewares/authentication')


router.post('/', authenticateUser, function(req,res){
        const body = req.body
        const story = new Story(body)
        story.user = req.user._id
       
        story.save()
            .then(function(story){
                console.log(story)
                res.send(story)
            })
            .catch(function(err){
                res.send(err)
            })
    })
// router.post('/',authenticateUser ,function(req, res){
//     const body = req.body
//     const story=new Story(body)
//     story.user = req.user._id
//     // story.tags = req.tag
//    // story.topic = req.topic

//     console.log(body)
//     story.save()
//         .then(function(story){
//             console.log(story)
//            // res.send(story)
//         })
//         .catch(function(err){
//             res.send(err)
//         })
// })


router.get('/', authenticateUser , function(req, res){
    Story.find({ user : req.user._id }) 
        .then(function(Story){
            
            res.send(Story)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/:id', authenticateUser ,function(req, res){
    const id=req.params.id
    Story.findOne({
        user : req.user._id,
        _id : id
    }).populate('topic').populate('user').populate('tag')
        .then(function(story){
            console.log(story)
            if(story){
                res.send(story)
            }else{
                res.send({})
            }
        })
        .catch(function(err){
            res.send(err)
        })
})


router.delete('/:id', authenticateUser ,function(req, res){
    const id=req.params.id
    
    Story.findOneAndDelete(
        {
            user : req.user._id,
            _id : id
        }
    )
        .then(function(story){
            res.send(story)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.put('/:id', authenticateUser ,function(req, res){
    const id=req.params.id
    const body=req.body
    Story.findOneAndUpdate({
        user : req.user._id,
        _id : id
    } , {$set : body} , {new: true , runValidators : true})
        .then(function(story){
            res.send(story)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    storyRouter : router
}




// const express = require('express')
// const router = express.Router()
// const { authenticateUser} = require("../middlewares/authentication")
// const {Story} = require('../models/Story')

// router.get('/', authenticateUser, function(req,res){
//     Story.find({user: req.user._id})
//         .then(function(stories){
//             res.send(stories)
//         })
//         .catch(function(err) {
//             res.send(err)
//         })
// })

// router.post('/', authenticateUser, function(req,res){
//     const body = req.body
//     const story = new Story(body)
//     story.user = req.user._id
   
//     story.save()
//         .then(function(story){
//             res.send(story)
//         })
//         .catch(function(err){
//             res.send(err)
//         })
// })

// router.delete('/:id', authenticateUser, function(req,res){
//     const id = req.params.id
//     Story.findOneAndDelete( {
//         user : req.user._id,
//         _id : id
//     })
       
//     .then(function(stroy){
//         res.send(story)
//     })
//     .catch(function(err){
//         res.send(err)
//     })
// })

// router.put('/:id', authenticateUser, function(req,res){
//     const id = req.params.id
//     const body = req.body

//     Story.findOneAndUpdate({user : req.user._id,
//         _id : id } ,
//         { $set : body},{new: true, runValidtaors:true})
//         // {user: req.user._id, _id : id},
//         // {$set: body},{new : true,runValidators: true })
//             .then(function(story){
//                 res.send(story)
//             })
//             .catch(function(err){
//                 res.send(err)
//             })
// })
// router.get('/:id', authenticateUser, function(req,res){
//     const id = req.params.id
//     Story.findOne({
//         user : req.user._id,
//         _id: id
//     })
//     .then(function(story){
//         if(story) {
//             res.send(story)
//         }
//         else {
//             res.send({})
//         }
//     })
//     .catch(function(err){
//         res.send(err)
//     })
// })
// module.exports = {
//     storyRouter : router
// }