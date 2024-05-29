const multer = require("multer")
const jwt = require("jsonwebtoken")
const path = require("path")
const SECRET_KEY = process.env.SECRET_JWT;
const pool = require("../connectdb")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads")
    },
    filename: function (req,file,cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const uploadFile = async (req, res) => {
    const { id, name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, profile_img = ? WHERE id = ?';
    try {
      if (!req.file) {
        return res.status(400).json({ status: false, msg: 'No file uploaded' });
      }
      const profile_img = `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}`;
      const sqlRes = await pool.promise().query(query, [name, email, profile_img, id]);
      const user = { id, name, email , profile_img};
      const token = jwt.sign(user,SECRET_KEY,{"expiresIn": "600m"})
      res.cookie("authToken",token,{httpOnly: true, expiresIn: 1000 * 60 * 10})
      res.status(200).json({ status: true, msg: "logged in successfully", authToken: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error occurred on server' });
    }
  };
  

module.exports = {uploadFile, upload}