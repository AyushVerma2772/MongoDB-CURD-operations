const express = require("express");
const mongoose = require("mongoose");
const StudentModel = require("./models/StudentModel");
const ClubModel = require("./models/ClubModel");

const app = express();


//? 1. Connect you express app with mongoDB;
mongoose.connect('mongodb://127.0.0.1:27017/college')
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err))


//! ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CURD operation in Mongoose ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓


//* 1. Create 
/*
//* 1a. using model
const s1 = new StudentModel({
    name: "Ayush Verma",
    rollNo: 59,
    result: [{sub: "DSA", marks: 90}, {sub: "Python", marks: 85}, {sub: "MERN", marks: 88}]
})

s1.save()
.then(doc => console.log(doc))
.catch(err => console.log(err))


//* 1b. using create method of Model
const doc = {
    name: "Gaurav Maurya",
    rollNo: 70,
    result: [{sub: "DSA", marks: 92}, {sub: "Python", marks: 80}, {sub: "MERN", marks: 60}]
}
StudentModel.create(doc)
.then(createdDocument => console.log(createdDocument))
.catch(err => console.log(err))


//* 1c. using insertMany method of Model
const docsArray = [{
    name: "Nistha",
    rollNo: 119,
    result: [{sub: "DSA", marks: 70}, {sub: "Python", marks: 60}, {sub: "MERN", marks: 5}]
}, {
    name: "Raghvi Tiwari",
    rollNo: 71,
    result: [{sub: "DSA", marks: 40}, {sub: "Python", marks: 50}, {sub: "MERN", marks: 10}]
}]

StudentModel.insertMany(docsArray)
.then(data => console.log(data))
.catch(err => console.log(err))
*/


//* 2. Read
/*
//* 2a. using find() method of Model
StudentModel.find()
.then(foundDoc => console.log(foundDoc))
.catch(err => console.log(err))

//* 2b. using findOne method of Model
StudentModel.findOne({"result.marks": 5})
.then(foundDoc => console.log(foundDoc))
.catch(err => console.log(err))


//* 2c. using findById method of Model
StudentModel.findById("660ae0ee50ff4a5cbed0409d")
.then(foundDoc => console.log(foundDoc))
.catch(err => console.log(err))
*/


//* 3. Update
/*
//* 3a using updateOne method of Model
StudentModel.updateOne({rollNo: 60}, {name: "Bhaumika"})
.then(res => console.log(res))
.catch(err => console.log(err)) 

//* 3b using updateMany method of Model
StudentModel.updateMany(
    { "result.sub": "Python lang" }, // Condition to find documents with 'Python' sub
    { $set: { "result.$[elem].sub": "Python" } }, // Update the 'sub' field
    { arrayFilters: [{ "elem.sub": "Python lang" }] } // Array filter to match elements in the 'result' array
)
.then(result => {
    console.log(result);
})
.catch(err => {
    console.error(err);
});

//* 3c. using findOneAndUpdate method of Model
StudentModel.findOneAndUpdate({rollNo: 60}, {name: "Bhaumika"})
.then(updatedDoc => console.log(updatedDoc))
.catch(err => console.log(err)) 

//* 3d. using findByIdAndUpdate method of Model
StudentModel.findByIdAndUpdate("660b9037aad9fcc8b719fbc9", {name: "BB ji"})
.then(updatedDoc => console.log(updatedDoc))
.catch(err => console.log(err)) 
*/


//* 4. Delete
/*
//* 4a. using deleteOne method of Model
StudentModel.deleteOne({rollNo: 60})
.then(res => console.log(res))
.catch(err => console.log(err))  

//* 4b. using deleteMany method of Model
StudentModel.deleteMany({rollNo: 60})
.then(res => console.log(res))
.catch(err => console.log(err))   

//* 4c. using findOneAndDelete method of Model
StudentModel.findOneAndDelete({rollNo: 119})
.then(deletedDoc => console.log(deletedDoc))
.catch(err => console.log(err)) 

//* 4d. using findByIdAndDelete method of Model
StudentModel.findByIdAndDelete("660b89ffafa9953e32884c39")
.then(deletedDoc => console.log(deletedDoc))
.catch(err => console.log(err)) 
*/


//* 5. Add reference of a another model
/*
ClubModel.insertMany([{
    title: "Dancing Club",
    description: "Dancing Club of NIET"
}, {
    title: "Coding Club",
    description: "Coding Club of NIET"
}]).then(docs => console.log(docs)).catch(err => console.log(err))


const addClub = async (clubName, studentName) => {
    const club = await ClubModel.findOne({title: clubName});
    const student = await StudentModel.findOne({name: studentName});

    if (club && student) {
        student.clubs.push(club);
        club.members.push(student);
        await student.save();
        await club.save();
    }

    else {
        console.log("Invalid Student name or club name")
    }
}


addClub("Dancing Club", "Ayush Verma");

*/





app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080")
})