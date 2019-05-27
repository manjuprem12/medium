const express = require('express')
const mongoose = require('./config/database')
const {usersRouter} = require('./app/controllers/UsersController')
const {topicRouter} = require('./app/controllers/TopicController')
const {storyRouter} = require('./app/controllers/StoryControllers')
const {tagsRouter} = require('./app/controllers/TagController')
const {responseRouter} = require('./app/controllers/ResponseController')

const port = 3005
const app = express()

app.use(express.json())
const cors = require ('cors')
app.use(cors())
app.use('/users', usersRouter)
app.use('/stories',storyRouter)
app.use('/topics',topicRouter)

app.use('/tags',tagsRouter)
app.use('/responses',responseRouter)

app.listen(port,function(){
    console.log("listen to port", port)
})