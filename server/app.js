const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/routes')
require('dotenv').config()
const port = 5000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req,res) =>{
    res.json({status: true, msg: 'welcome to our API'})
})

app.use(router)

app.listen( process.env.PORT || port, () => console.log(`server is listening on port ${port}`))