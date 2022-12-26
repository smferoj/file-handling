// Multiple file upload using DiskStorage engine (multer.array)
const express = require('express');
const app = express();
const helmet = require('helmet');
const multer = require('multer');

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const storage=multer.diskStorage({
    destination: (req,files,callBack)=> {
        console.log("=========>",files)
        callBack(null,'./uploads');
    },
    filename: (req,files,callBack)=> {
       
        console.log("++++++++++++>",files)
        callBack(null,files.originalname)
    }
   
});

const upload=multer({storage}).array('photos',5)
app.post('/multiple', (req,res)=> {
    upload(req,res, (error)=> {
            if(error){
                res.send("File Upload Fail")
            }
            else{
                res.send("File Upload Success")
            }
    });
});


app.listen(8000)
console.log("Server Run Success")