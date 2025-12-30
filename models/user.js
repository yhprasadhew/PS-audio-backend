import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email : {
        type: String,
        required : true,
        unique: true
    },

    password :{
        type : String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default : "customer"
    },

    firstname : {
        type: String,
        required: true
    },

    lastName :{
        type : String,
        required: true
    },
    address: {
       type : String,
        required: true
    }, 
     phone: {
        type : String,
        required: true
    },
    profilePicture :{
        type :String,
        required: true,
        default : "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
    } 

});

 const User = mongoose.model("User",userSchema)
   //userModel magin DB collection hadgnna
   
   export default User;  


   