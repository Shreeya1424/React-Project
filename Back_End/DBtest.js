const mongoose = require('mongoose');

const express=require('express');

const Student=require("./Student");

const bodyParser=require('body-parser');

const cors = require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());



const uri="mongodb+srv://Shreeya:asdfghjkl1424@cluster0.goca6.mongodb.net/Student";
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 ,
      })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('Database connection error:', err));
  

//get all
app.get('/student', async(req,res)=>{
    const ans = await Student.find();
    res.send(ans);
});



//getById
app.get('/student/:StudentID',async(req,res)=>{
    const ans =await Student.findOne({StudentID:req.params.StudentID});
    res.send(ans);
});

// create
app.post('/student',async(req,res)=>{
    stu=new Student({...req.body});
    const ans =await stu.save();
    res.send(ans);
});

// app.post('/faculty', async (req, res) => {
//     try {
//         const stu = new Faculties(req.body);
//         const ans = await stu.save();
//         res.status(201).send(ans); // 201 Created
//     } catch (error) {
//         res.status(400).send('Error creating faculty: ' + error.message);
//     }
// });


//update
app.patch('/student/:StudentID', async (req, res) => {
    try {
        // Find the room by ID
        const stu = await Student.findOne({ StudentID: req.params.StudentID});
  
        // If the room is not found, return a 404 response
        if (!stu) {
            return res.status(404).send('Student not found');
        }
  
        // Update the room with the new values from the request body
        Object.assign(stu, req.body);
  
        // Save the updated room
        const ans = await stu.save();
  
        // Respond with the updated room details
        res.send(ans);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send('Error updating student: ' + error.message);
    }
  });
    


//delete
app.delete('/student/:StudentID',async(req,res)=>{
    const ans =await Student.deleteOne({StudentID:req.params.StudentID});
    // ans.deleteOne();
    // await stu.save();
    res.send(ans);
});

  


const PORT = 9000;
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
});







