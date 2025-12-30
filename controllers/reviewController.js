import Review from "../models/review.js";


export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message: "please login and try again"
        })
        return ;
    }
    const data = req.body;  //data kiyna variable ekta request eke body(data) tika sAVE KRA GNI

  data.name = req.user.firstName + " " + req.user.lastName;
  data.profilePicture = req.user.profilePicture;
  data.email = req.user.email;


    const newReview = new review(data); 

    newReview.save()
    .then(() =>{
        res.json({message:"review added successfully"});
    })
    .catch((error) =>{
        res.status(500).json({error:"review addition failed"});
    });
}

export function getReviews(req,res){

    const user = req.user;

    if (user == null  || user.role != "admin" ){
        Review.find({isApproved : true})
        .then((reviews) =>{
            res.json(reviews);
        })
        return
        }
        if(user.role == "admin"){
            Review.find()
            .then((reviews) =>{
                res.json(reviews);
            })  
        }
    }
