import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    Key:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
     category:{
        type: String,
        required: true,
        default: "uncategorized"
    },
    
    dimensions: {
        type: String,
        required: true  
    },

    description :{
        type: String,
        required: true
    },

    availability:{
        type: Boolean,
        required: true,
        default: true
    },
    image:{
        type: [String],
        required: true ,
        default: ["https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"]
    }  
})
const Product = mongoose.model("Products",productSchema);


export default Product;