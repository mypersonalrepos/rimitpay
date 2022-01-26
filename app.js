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
app.delete('/student/delete/:id',(req,res)=>{
     
    id = req.params.id;
    studentModel.findByIdAndDelete( id )
        .then(() => {
            console.log('success')
            res.send();
        })
        .catch(err => {console.log(err);});
     
  })









  // class page
app.get("/class", function (req, res) {
    classModel.find()
        .then(function (items) {
            res.send(items);
        });
});
// class single page
app.get("/class/single/:id", function (req, res) {
    const i = req.params.id;

    classModel.findOne({ _id: i })
        .then(function (item) {
            res.send(item);
    })
}); 






//class posting
app.post('/class/post', function (req, res) {
    var items = {
        std: req.body.std,
        div: req.body.div
        
    }
    var saveclassdata = classModel(items);
    saveclassdata.save((err, success) => {
        if (err) {
           console.log(err, "error adding class");
        } else {
            console.log(success, "class added successfully");
        }
    });
})


// updating class
app.put('/class/update/:id',  (req,res)=>{
    console.log(req.body);
    let id = req.params.id;
    
    classModel.findByIdAndUpdate(id, {
        std: req.body.std,
        div: req.body.div
       
    }, (err, result) => {
        if (err) {
            console.log(err, "error updating student");
        } else {
            console.log(result, "student updated successfully");
        }
   })
 })



 //class deleting
app.delete('/class/delete/:id', (req, res) => {
     id = req.params.id;
    classModel.findByIdAndDelete(id)
        .then(() => {
            console.log('success')
            res.send();
        })
        .catch(err => { console.log(err); });
});

app.listen(port, ()=> console.log(`app listening at ${port}`))