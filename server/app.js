const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv").config()
const SECRET_KEY = process.env.SECRET

const user = [{
    id: 1,
    username: "nagyvee"
},
{
    id: 2,
    username:"elolo2024"
},{
    id: 3,
    username: "pipi2024"
}
]

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}))


app.use(bodyParser.json())
app.get('/', (req,res) =>{
    res.json({status: true, user: user})
})

app.post('/login', (req,res) =>{
    const userId = req.body.username

    const userReq = user.find((userObj) => userObj.username === userId)

    if(userReq === undefined ) {res.send('wrong username')}else{
      const token =  jwt.sign(userReq,SECRET_KEY, {'expiresIn': '180s'})
      res.cookie('authToken', token, {
        maxAge: 1000 * 60 * 5,
        httpOnly: true
      })
     res.json({status: true, msg: 'Logged in successfully.'})
    }
})


app.use(cookieParser())
const verification = (req,res,next) =>{
    const token = req.cookies["authToken"]
    console.log(token)

    if(!token) res.send('token required to access')
    if(token) {
        jwt.verify(token,SECRET_KEY, (err,result) =>{
            if(err) res.send('invalid token')
             if(result){ req.user = result; next()}
        })
    }
}

app.get('/profile', verification, (req,res) =>{
    res.send(`Welcome back ${req.user.username}`)
})


app.listen(5000 ,(err,res) =>{
    if(err) console.log(err)
        console.log('server starting.....')
})