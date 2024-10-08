const mongoose= require('mongoose');

const express=require('express');

const Product=require("./Product");

const bodyParser=require('body-parser');

const cors = require('cors');

const app=express();
app.use(bodyParser.json());
app.use(cors());



const uri="mongodb+srv://Shreeya:asdfghjkl1424@cluster0.goca6.mongodb.net/Product";
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 ,
      })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('Database connection error:', err));
  

//get all
app.get('/Products', async(req,res)=>{
    const ans = await Product.find();
    res.send(ans);
});



//getById
app.get('/Products/:ProductID',async(req,res)=>{
    const ans =await Product.findOne({ProductID:req.params.ProductID});
    res.send(ans);
});



//create
app.post('/Products',async(req,res)=>{
    stu=new Product({...req.body});
    const ans =await stu.save();
    res.send(ans);
});


app.patch('/Products/:ProductID', async (req, res) => {
    try {
        // Find the room by ID
        const pro = await Product.findOne({ ProductID: req.params.ProductID });
  
        // If the room is not found, return a 404 response
        if (!pro) {
            return res.status(404).send('Room not found');
        }
  
        // Update the room with the new values from the request body
        Object.assign(pro, req.body);
  
        // Save the updated room
        const ans = await pro.save();
  
        // Respond with the updated room details
        res.send(ans);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).send('Error updating room: ' + error.message);
    }
  });
    

//delete
app.delete('/Products/:ProductID',async(req,res)=>{
    const ans =await Product.deleteOne({ProductID:req.params.ProductID});
    // ans.deleteOne();
    // await stu.save();
    res.send(ans);
});

  

const PORT = 8000;
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
});