
import mongoose from "mongoose";  


const inquirySchema = new mongoose.Schema({

    id: {   
        type: Number,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: { 
        type: Date,
        required: true,
        default: Date.now
    },
    phone: {
        type: String,
        required: true 
    } ,
    response: {
        type: String,
        required: false,
        default: ""
    },
    isresolved: { 
        type: Boolean,
        required: true,
        default: false
    }  
})

const Inquiry = mongoose.model("Inquiry",inquirySchema);

export default Inquiry;