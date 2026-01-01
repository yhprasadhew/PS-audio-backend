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


    const newReview = new Review(data); 

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

    export function deleteReview(req,res){
        const email = req.params.email;
        if(req.user == null ){
            res.status(403).json({
                message: "please login and try again"
            });
            return
        }
        
if(req.user.role == "admin"){
        Review.deleteOne({email: email})
        .then(() =>{
            res.json({message: "review deleted successfully"});
        })
        .catch((error) =>{
            res.status(500).json({error: "review deletion failed"});
        });
        return
        
        if(req.user.role =="customer"){         
        
            if(req.user.email == email){  //eya dpuma email eka d....

                Review.deleteOne({email: email})
                .then(() =>{
                    res.json({message: "review deleted successfully"});     
                
            } ).catch(() =>{
                

            
                res.status(500).json({error: "review deletion failed"});
            });
            } else{
                res.status(403).json({
                    message: "you are not authorized to do this action"
                }); 
            }
    }
}
}

export function approveReview(req,res){
    const reviewId = req.params.reviewId;

    if(req.user == null) {
        res.status(401).json({
            message: "please login and try again"
        });
        return
    }
    if(req.user.role == "admin"){
        Review.updateOne(
            {_email :email,
            },
            {
                isApproved : true,
            }
        ).then(() =>{
            res.json({message: "review approved successfully"});
        } ).catch(() =>{
            res.status(500).json({error: "review approval failed"});
        });
    }else{ 
        res.status(403).json({
            message: "you are not admin to do this action"
        });
       
    }
}