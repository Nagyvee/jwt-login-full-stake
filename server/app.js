const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/routes')
const path = require("path")
require('dotenv').config()
const port = 5000

//allow our frontend access
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true //to accept cookies
}))
app.use(bodyParser.json())
app.use(cookieParser())
//share uploded images to the frontend
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req,res) =>{
    res.json({status: true, msg: 'welcome to our API'})
})
//routes
app.use(router)

app.listen( process.env.PORT || port, () => console.log(`server is listening on port ${port}`))