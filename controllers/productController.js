import Product from "../models/products.js";
import { isItAdmin } from "./userController.js";


export async function addProduct(req,res){

   

    if (req.user==null){
        res.status(401).json({
            message: "please login and try again"
        })
        return
    }
    if (req.user.role != "admin"){
        res.status(403).json({
            message: "you are not authorized to do this action"

        })
        return
    }

    const data = req.body;
    const newProduct = new Product(data);
    try{
    await newProduct.save();
    
        res.json({
            message:"product added successsfully"});

    }catch(error){
        res.status(500).json({
            error:"product addition failed"});
    }

}

export async function getProducts(req,res){

    let isAdmin= isItAdmin(req);

try{

if(isItAdmin(req)){
        const products = await Product.find();
        res.json(products);
        return;
}else{
        const products = await Product.find({availability:true});
        res.json(products);
    }   
    }catch(e){
        res.status(500).json({
            error:"cannot find products"
        });
    }
}

export async function updateProduct(req,res){
    try{
        if(isItAdmin(req)){ 
            const Key = req.params.Key;  //wdgth theory
            const data = req.body; 
            await Product.updateOne({Key: Key},data);
            res.json({
                message:"product updated successfully"
            });
            return;


        }else{
            res.status(403).json({
                message:"you are not authorized to do this action"
            });
            return;
        }

    }
    catch(e){
        res.status(500).json({
            error:"product updation failed"
        });
    }
}

export async function delProduct(req,res){
    try{
        if(isItAdmin(req)){ 
            const Key = req.params.Key;  //wdgth theory
            await Product.deleteOne({ Key:  Key});
            res.json({
                message:"product deleted successfully"
            });
            return; 
        }else{
            res.status(403).json({
                message:"you are not authorized to do this action"
            });
            return;
        }  
    }
    catch(e){
        res.status(500).json({
            error:"product deletion failed"
        });
    }    
}
