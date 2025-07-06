import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{
        type:String
      
    },
    class:{
        type:Number
        
    },
    age:{
 type:String

    }
});
const StudentsData = new mongoose.model("Students",StudentSchema);
export default StudentsData;