const mongoose = require("mongoose");
const schema = mongoose.Schema;
const studentschema = new schema({
    name: String,
    
    roll: String,

    mobile: Number,

    classids: String,
    
})


var studentdata = mongoose.model('student', studentschema);
module.exports = studentdata;