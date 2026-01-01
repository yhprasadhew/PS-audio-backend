import express from "express";
import { addReview, getReviews,deleteReview,approveReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview)
reviewRouter.get("/",getReviews)
reviewRouter.delete("/:email", deleteReview)
reviewRouter.put("/approve/:email",approveReview)


reviewRouter.get("/approved",
    (req,res)=>{
        console.log("this is approved Route")
    })


    reviewRouter.get("/:email",
    (req,res)=>{
        console.log("this is email route")
    })
 
    reviewRouter.put("/approve/email",approveReview)


export default reviewRouter;