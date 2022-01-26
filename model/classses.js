const mongoose = require("mongoose");
const schema = mongoose.Schema;


const classSchema = new schema({


    std: String, 
    div: String
})


var classdata = mongoose.model('class', classSchema);
module.exports = classdata;