const pool = require("../connectdb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const SECRET_KEY = process.env.SECRET_JWT;

const tokenVerification = async (req, res, next) => {
  const token = req.cookies["authToken"];
  if (!token) res.status(401).json({ status: false, msg: "token is required" });

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, result) => {
      if (err) res.status(403).json({ status: false, msg: "invalid token" });
      else {
        req.user = result;
        next();
      }
    });
  }
};

const logIn = async (req, res) => {
    const reqEmail= req.body.email
    const reqPassword = req.body.password
    
    const query = `SELECT * FROM users WHERE email = ?`
     pool.query(query,[reqEmail], (err,result) => {
        if(err) res.status(401).json({status:false, msg: 'error occur.Please try again later.'})
       else if(result.length < 1) res.status(400).json({status:false, msg: "incorrect username"}) 
        else{
            const {id,name,password,email, profile_img} = result[0]
            bcrypt.compare(reqPassword,password, function(err,match) {
                if(err) {console.log(err)}
                else if(match) {
                    const user = { id, name, email , profile_img};
                   const token = jwt.sign(user,SECRET_KEY,{"expiresIn": "600m"})
                   res.cookie("authToken",token,{httpOnly: true, expiresIn: 1000 * 60 * 10})
                   res.status(200).json({ status: true, msg: "logged in successfully", authToken: token });
                }
                else res.status(400).json({status:false, msg: "incorrect password"}) 
            }) 
        }
     })

};

const registerUser = async (req, res) => {
  const { name, password, email} = req.body;
  console.log(req.body)

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword)
    const query = `INSERT INTO users(name,password,email) VALUES (?,?,?)`;
    await pool
      .promise()
      .query(query, [name, hashPassword, email]);
    res.status(200).json({ status: true, msg: "user creation is successfull" });
  } catch (error) {
    console.log(error)
    res.status(401).json({
      status: false,
      msq: "error occur while processing. Please try again later",
    });
  }
};

const getUserProfile = async (req, res) => {
    const {username,firstName,lastName,password} = req.user
  res.status(200).json({ status: true, msg: `Welcome back ${firstName} ${lastName} 😊!` });
};

const updateProfile = async (req,res) =>{
  console.log(req.body)
  const {id,name,email,img} = req.body
  const query = `update users SET name = ?, email = ? , profille_img = ? where id = ?`;
       try {
        const sqlRes =   pool.query(query, [name,email,img,id])
        res.send('done')
        console.log(sqlRes)
       } catch (error) {
        console.log(err)
        res.send('error occur on server')
       }
}

module.exports = {
  logIn, 
  registerUser,
  tokenVerification,
  getUserProfile,
  updateProfile
};
