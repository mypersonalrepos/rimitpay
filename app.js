const express = require("express");
const app = express();
const multer = require("multer");

const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const studentModel = require("./model/students");
const classModel = require("./model/classses");

mongoose.connect("mongodb+srv://rimitpayments:yzrDRtu131qLo1G2@rimitpayments.qittx.mongodb.net/test", { useNewUrlParser: true }).then(() => console.log('mongo connected')).catch(err => console.log(err));





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

// multer
var fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    },
});
var imageuploads = multer({ storage: fileStorageEngine });


// student page
app.get("/student", function (req, res) {
    studentModel.find()
        .then(function (items) {
            res.send(items);
        });
});
// student single page
app.get("/student/single/:id", function (req, res) {
    const i = req.params.id;

    studentModel.findOne({ _id: i })
        .then(function (item) {
            res.send(item);
    })
}); 






//student posting
app.post('/student/post', function (req, res) {
    var items = {
        name: req.body.name,

        roll: req.body.roll,

        mobile: req.body.mobile,

        classids: req.body.classids
        
    }
    
        var savestudentdata = studentModel(items);
    

    savestudentdata.save((err, success) => {
        if (err) {
           console.log(err, "error adding student");
        } else {
            console.log(success, "student added successfully");
        }
    });
})


// // updating student
// app.post('/student/update/:id', (req, res) => {
//     let id = req.params.id;
    
//     studentModel.findByIdAndUpdate(id, {
//         name: req.body.name,
//         roll: req.body.roll,

//         mobile: req.body.mobile,

//         classids: req.body.classids
       
//     }, (err, result) => {
//         if (err) {
//             console.log(error, "error updating student");
//         } else {
//             console.log(result, "student updated successfully");
//         }
//     })
// });
app.put('/student/update/:id',  (req,res)=>{
    console.log(req.body);
    let id = req.params.id;
    
    studentModel.findByIdAndUpdate(id, {
        name: req.body.name,
        roll: req.body.roll,

        mobile: req.body.mobile,

        classids: req.body.classids
       
    }, (err, result) => {
        if (err) {
            console.log(err, "error updating student");
        } else {
            console.log(result, "student updated successfully");
        }
   })
 })
//student deleting
app.get('/student/delete/:id', (req, res) => {
    let id = req.params.id;
    studentModel.findByIdAndRemove(id, (err, result) => {
       
        if (err) {
            console.log(err, "error deleting student");
        } else {
            console.log(success, "student deleted successfully");
        }
    })
});
app.delete('/student/delete/:id',(req,res)=>{
     
    id = req.params.id;
    studentModel.findByIdAndDelete({_id:id})
    .then(()=>{
        console.log('success')
        res.send();
    })
     
  })





app.listen(port, ()=> console.log(`app listening at ${port}`))