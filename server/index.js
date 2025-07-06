import express from 'express';
import connection from './database/db.js';
import StudentsData from './models/students.js';
import cors from 'cors';
const app = express();
const port = 3002;
app.get('/',(req,res)=>{
    res.send("Hey Students")
})


//middleware
app.use(express.json());

// cors cross origin policy
app.use(cors());
// 

// post 
app.post("/students",async(req,res)=>{
    try{
    const addingStudents = new StudentsData(req.body);
    const insertedstudent = await addingStudents.save();
    res.status(201).send(insertedstudent);
    }catch(error){
        res.send(error);
    }

})

// get

app.get('/students',async(req,res)=>{
    try {
       const getStudents = await StudentsData.find({}) 
       res.status(201).send(getStudents);
    } catch (error) {
       res.status(400).send(error) 
    }
})

// get particular student
app.get('/students/:id',async(req,res)=>{
    try {
        const _id = req.params.id;
       const getStudent = await StudentsData.findById({_id}) 
       res.status(201).send(getStudent);
    } catch (error) {
       res.status(400).send(error) 
    }
})

// update student with patch 
app.put('/students/:id',async(req,res)=>{
    try {
       const _id = req.params.id;
       const updateStudent = await StudentsData.findByIdAndUpdate({_id},req.body,{new:true}) 
       res.status(201).send(updateStudent);
    } catch (error) {
       res.status(500).send(error) 
    }
})

// delete student
app.delete('/students/:id',async(req,res)=>{
    try {
       const _id = req.params.id;
       const deleteStudent = await StudentsData.findByIdAndDelete({_id}) 
       res.status(201).send(deleteStudent);
    } catch (error) {
       res.status(500).send(error) 
    }
})


app.listen(port,()=>{
    console.log(`server is running on localhost::${port}`);
    connection();
});