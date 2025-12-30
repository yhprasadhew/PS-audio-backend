import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email :{
        type: String,
        required: true,
        unique: true
    },
    name :{
        type: String,
        required: true 
    },

    rating :{
        type: Number,
        required: true
    },
    comment :{
        type: String,
        required: true
    },
    Date:{
        type: Date,
        required : true,
        default: Date.now()
    },
    isApproved:{
        type:  Boolean,
        required:true,
        default: false
    },
    profilePicture:{
        type :String,
        required: true,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s"
    }
    

})
const Review = mongoose.model("Review",reviewSchema);
export default Review;
