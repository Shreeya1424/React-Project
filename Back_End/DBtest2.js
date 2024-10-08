const mongoose = require('mongoose');

const express=require('express');

const Faculties=require("./Faculties");

const bodyParser=require('body-parser');

const cors = require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());




const uri="mongodb+srv://Shreeya:asdfghjkl1424@cluster0.goca6.mongodb.net/Faculty";
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 ,
      })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('Database connection error:', err));
  

//get all
app.get('/faculty', async(req,res)=>{
    const ans = await Faculties.find();
    res.send(ans);
});



//getById
app.get('/faculty/:FacultyID',async(req,res)=>{
    const ans =await Faculties.findOne({FacultyID:req.params.FacultyID});
    res.send(ans);
});

// create
app.post('/faculty',async(req,res)=>{
    stu=new Faculties({...req.body});
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
app.patch('/faculty/:FacultyID', async (req, res) => {
    try {
        // Find the room by ID
        const fac = await Faculties.findOne({ FacultyID: req.params.FacultyID});
  
        // If the room is not found, return a 404 response
        if (!fac) {
            return res.status(404).send('Room not found');
        }
  
        // Update the room with the new values from the request body
        Object.assign(fac, req.body);
  
        // Save the updated room
        const ans = await fac.save();
  
        // Respond with the updated room details
        res.send(ans);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send('Error updating room: ' + error.message);
    }
  });
    


//delete
app.delete('/faculty/:FacultyID',async(req,res)=>{
    const ans =await Faculties.deleteOne({FacultyID:req.params.FacultyID});
    // ans.deleteOne();
    // await stu.save();
    res.send(ans);
});

  


const PORT = 7100;
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
});







