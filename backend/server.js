require('dotenv').config()

const express = require('express')


//creates express app
const app = express()


//responds to get requests
app.get('/', (req,res) =>{
    res.json({mssg: "Welcome to the app"})
})

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})

process.env