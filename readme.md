# Models
## StudentModel

``` javascript
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

const StudentModel = mongoose.model("Student", StudentSchema);

```


## ClubModel
``` javascript
const clubSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]

})

const ClubModel = mongoose.model("Club", clubSchema);
```


# CURD operation in Mongoose

## 1. Create 

### 1a. using model
``` javascript
const s1 = new StudentModel({
    name: "Ayush Verma",
    rollNo: 59,
    result: [{sub: "DSA", marks: 90}, {sub: "Python", marks: 85}, {sub: "MERN", marks: 88}]
})

s1.save()
.then(doc => console.log(doc))
.catch(err => console.log(err))
```

### 1b. using create method of Model
``` javascript
const doc = {
    name: "Gaurav Maurya",
    rollNo: 70,
    result: [{sub: "DSA", marks: 92}, {sub: "Python", marks: 80}, {sub: "MERN", marks: 60}]
}
StudentModel.create(doc)
.then(createdDocument => console.log(createdDocument))
.catch(err => console.log(err))
```

### 1c. using insertMany method of Model
``` javascript
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
```

## 2. Read

### 2a. using find() method of Model
``` javascript 
StudentModel.find()
.then(foundDoc => console.log(foundDoc))
.catch(err => console.log(err))
```

### 2b. using findOne method of Model
``` javascript 
StudentModel.findOne({"result.marks": 5})
.then(foundDoc => console.log(foundDoc))
.catch(err => console.log(err))
```

### 2c. using findById method of Model
``` javascript 
StudentModel.findById("660ae0ee50ff4a5cbed0409d")
.then(foundDoc => console.log(foundDoc))
.catch(err => console.log(err))
```

## 3. Update

### 3a using updateOne method of Model
``` javascript
StudentModel.updateOne({rollNo: 60}, {name: "Bhaumika"})
.then(res => console.log(res))
.catch(err => console.log(err)) 
```

### 3b using updateMany method of Model
``` javascript
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
```

### 3c. using findOneAndUpdate method of Model
``` javascript
StudentModel.findOneAndUpdate({rollNo: 60}, {name: "Bhaumika"})
.then(updatedDoc => console.log(updatedDoc))
.catch(err => console.log(err)) 
```

### 3d. using findByIdAndUpdate method of Model
``` javascript
StudentModel.findByIdAndUpdate("660b9037aad9fcc8b719fbc9", {name: "BB ji"})
.then(updatedDoc => console.log(updatedDoc))
.catch(err => console.log(err)) 
```

## 4. Delete

### 4a. using deleteOne method of Model
``` javascript 
StudentModel.deleteOne({rollNo: 60})
.then(res => console.log(res))
.catch(err => console.log(err))  
```

### 4b. using deleteMany method of Model
``` javascript 
StudentModel.deleteMany({rollNo: 60})
.then(res => console.log(res))
.catch(err => console.log(err))   
```

### 4c. using findOneAndDelete method of Model
``` javascript 
StudentModel.findOneAndDelete({rollNo: 119})
.then(deletedDoc => console.log(deletedDoc))
.catch(err => console.log(err)) 
```

### 4d. using findByIdAndDelete method of Model
``` javascript 
StudentModel.findByIdAndDelete("660b89ffafa9953e32884c39")
.then(deletedDoc => console.log(deletedDoc))
.catch(err => console.log(err)) 
```



## 5. Add reference of a another model
``` javascript
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
```