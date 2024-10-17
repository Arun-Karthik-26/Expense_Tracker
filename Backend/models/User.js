import mongoose from "mongoose";
import  {Schema,model} from "mongoose";
const userc=new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    income:{
        type:Number,
        required:true
    }
});
const user= new model("user_details",userc);
export default user;