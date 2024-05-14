const pool = require("../connectdb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const SECRET_KEY = process.env.SECRET_JWT;

const tokenVerification = async (req, res, next) => {
  const token = req.cookies["authToken"];
  if (!token) res.json({ status: false, msg: "token is required" });

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, result) => {
      if (err) res.json({ status: false, msg: "invalid token" });
      else {
        req.user = result;
        next();
      }
    });
  }
};

const logIn = async (req, res) => {
    const {username,password} = req.body
};

const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users(username,password,firstName,lastName,email) VALUES (?,?,?,?,?)`;
    await pool
      .promise()
      .query(query, [username, password, firstName, lastName, password]);
    const user = { username, firstName, lastName, email };
    const token = await jwt.sign(user, SECRET_KEY, { expiresIn: "180s" });
    res.cookie("authToken", token, { httpOnly: true, maxAge: 1000 * 60 * 4 });
    res.json({ status: true, msg: "user creation successfull" });
  } catch (error) {
    res.json({
      status: false,
      msq: "error occur while processing. Please try again later",
    });
  }
};

const getUserProfile = async (req, res) => {
    const {username,firstName,lastName,password} = req.user
  res.json({ status: true, msg: `Welcome back ${firstName} ${lastName} 😊!` });
};

module.exports = {
  logIn,
  registerUser,
  tokenVerification,
  getUserProfile,
};
