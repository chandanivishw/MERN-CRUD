import mongoose from "mongoose";
 const connection = async()=>{
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/STUDENT");
        console.log("mongodb connected successfully.")
    }catch(error){
        console.log(error);
    }

 }
 export default connection;