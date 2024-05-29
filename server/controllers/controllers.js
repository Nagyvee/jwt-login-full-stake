const pool = require("../connectdb");
const jwt = require("jsonwebtoken"); //importing jwt library
const bcrypt = require("bcrypt"); 
const { json } = require("body-parser");
const SECRET_KEY = process.env.SECRET_JWT;

//token verificaction function
const tokenVerification = async (req, res, next) => {
  const token = req.cookies["authToken"];
  //check if req have a token
  if (!token) res.status(401).json({ status: false, msg: "token is required" });

  //if token exits check if its valid
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

//function to login
const logIn = async (req, res) => {
  // requirements rom request body
    const reqEmail= req.body.email
    const reqPassword = req.body.password
    const {rememberMe} = req.body
    let time; //variable to set token duration 
    
    const query = `SELECT * FROM users WHERE email = ?`
    //check the user in database
     pool.query(query,[reqEmail], (err,result) => {
      // handle errors
        if(err) res.status(401).json({status:false, msg: 'error occur.Please try again later.'})
          // if no matching user
       else if(result.length < 1) res.status(400).json({status:false, msg: "incorrect username"}) 
        else{
            const {id,name,password,email, profile_img} = result[0]
            //compare the hashed passwords
            bcrypt.compare(reqPassword,password, function(err,match) {
                if(err) {console.log(err)}
                else if(match) {
                    const user = { id, name, email , profile_img};
                    if(rememberMe)  time = "148h" //1 week token duration if remember me isb true
                    else time = "1h" //set 1hr if rm ids false
                   const token = jwt.sign(user,SECRET_KEY,{"expiresIn": time})
                   //send token as a cookie
                   res.cookie("authToken",token,{httpOnly: true, expiresIn: 1000 * 60 * 10})
                   //respond to the frondend
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
    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword)
    //insert into db
    const query = `INSERT INTO users(name,password,email) VALUES (?,?,?)`;
    await pool
      .promise()
      .query(query, [name, hashPassword, email]);
      //response
    res.status(200).json({ status: true, msg: "user creation is successfull" });
  } catch (error) {
    console.log(error)
    //if any error
    res.status(401).json({
      status: false,
      msq: "error occur while processing. Please try again later",
    });
  }
};

const getUserProfile = async (req, res) => {
  //requiremwents from req.user after passing the token verification
    const {username,firstName,lastName,password} = req.user
  res.status(200).json({ status: true, msg: `Welcome back ${firstName} ${lastName} 😊!` });
};

const updateProfile = async (req,res) =>{
  //requirements
  const {id,name,email,img} = req.body
  const query = `update users SET name = ?, email = ? , profille_img = ? where id = ?`;
       try {
        //query db with new details
        const sqlRes =   pool.query(query, [name,email,img,id])
        //if done
        res.send('done')
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
