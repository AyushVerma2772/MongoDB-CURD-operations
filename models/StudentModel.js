const mongoose = require("mongoose");


//? 2. Create a Schema
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },

    rollNo: { type: Number, required: true, min: 1 },

    result: [{
        sub: { type: String, required: true, trim: true },
        marks: { type: Number, required: true, min: 1 }
    }],

    clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club"
    }]
    

})


//? 3. create a model
const StudentModel = mongoose.model("Student", StudentSchema);


module.exports = StudentModel;
