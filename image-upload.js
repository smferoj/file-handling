const express = require('express');
const app = express();
const helmet = require('helmet');
const multer = require('multer');

app.use(helmet())
app.use(express.static('uploads'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const storage=multer.diskStorage({
    destination: (req,file,callBack)=> {
        callBack(null,'uploads');
    },
    filename: (req,file,callBack)=> {
        callBack(null,file.originalname)
    }    
    
});

app.post("/image-upload",async(req,res)=>{
try{
    
// video/mp4
    const maxSize = 5 * 1024 * 1024; // for 5MB  
    const upload=multer({
        storage,
        fileFilter: (req, file, cb)=> {
          if(file.mimetype==="image/jpg"||
            file.mimetype==="image/png"||
            file.mimetype==="image/jpeg"||
            file.mimetype==="image/webp" ||
            file.mimetype==="video/mp4"     
          ){
            cb(null, true)
          }else{
            cb(null, false);
            return cb(new Error("Only jpg, png, jpeg and webp format is allowed"))
          }
        },
        limits: { fileSize: maxSize }
      }).array('photos',12)

    //   req.body= name, father name, age  req.file=image req.files

      upload(req,res, (error)=> {  
        console.log("body test", req.body);
        console.log("files test", req.files);

        if (error instanceof multer.MulterError) {        
            res.status(400).json({
              status:"Fail",
              message:error.message
            })
          } else if (error) {      
            res.status(400).json({
              status:"Fail",
              message:error.message
            })
          } 
          res.status(200).json({message:"File upload success"});
      })
 
}catch(err){
    console.log(err)
}
})

app.listen(8000)
console.log("Server Run Success")