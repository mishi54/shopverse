import mongoose from "mongoose";

const userModelSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    image:{type:String,optional:true},
    refreshToken:{type:String}
},{timestamps:true});

export default mongoose.model('User',userModelSchema);