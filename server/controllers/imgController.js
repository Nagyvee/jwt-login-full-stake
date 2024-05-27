const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./uploads")
    },
    filename: function (req,file,cb){
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

 const uploadFile = async (req,res) => {
    console.log(req.body)
    try {
        if(!req.file){
            return res.status(400).json({status: false,msg: "no file uploaded"})
        }
        const imgUrl = `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}`;
        res.status(200).json({status: true, msg: "image received"})
        console.log(imgUrl)
    } catch (error) {}
}

module.exports = {uploadFile, upload}