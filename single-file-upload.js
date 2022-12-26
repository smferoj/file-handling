// Single file upload using DiskStorage engine (multer.single)
const express = require('express');
const app = express();
const helmet = require('helmet');
const multer = require('multer');

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const storage=multer.diskStorage({
    destination: (req,file,callBack)=> {
        console.log("++++++>",file)
        callBack(null,'./uploads');
    },
    filename: (req,file,callBack)=> {
       
        console.log("=========>",file)
        callBack(null,file.originalname)
    }
   
});

const upload=multer({storage}).single('myfile')


app.post('/', (req,res)=> {
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