import mongoose from "mongoose";
 const connection = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully.")
    }catch(error){
        console.log(error);
    }

 }
 export default connection;