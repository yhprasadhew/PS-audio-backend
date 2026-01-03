import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";

export async function addInquiry(req, res) {
    try {
        if (!isItCustomer(req)) {
            return res.status(403).json({
                message: "you are not authorized to do this action"
            });
        }

        const data = req.body;

        // attach logged-in user details
        data.email = req.user.email;
        data.phone = req.user.phone;

        // generate auto-increment id
        let id = 1;
        const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);

        if (inquiries.length > 0) {
            id = inquiries[0].id + 1;
        }

        data.id = id;

        const newInquiry = new Inquiry(data);
        await newInquiry.save();

        res.json({
            message: "inquiry added successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "inquiry addition failed"
        });
    }
}

export async function getInquiries(req, res) {
    try {

        if (isItCustomer(req)){

            const inquiries = await Inquiry.find({ email: req.user.email });
            res.json(inquiries);  
               return;  

        }else if (isItAdmin(req)){

            const inquiries = await Inquiry.find();
            res.json(inquiries);
            return;

        }else{
            res.status(403).json({  
                message: "you are not authorized to do this action"
            });
        } 

    } catch (e) {
        res.status(500).json({
            error: "cannot fetch inquiries"
        });

    }
}

export async function delInquiry(req, res) {
    try {
        if (isItAdmin(req)) {
            const id = req.params.id;

            await Inquiry.deleteOne({ id: id });
            res.json({
                message: "inquiry deleted successfully"
            });
            return;
        }else if (isItCustomer(req)) {
            const id = req.params.id;
            const inquiry = await Inquiry.findOne({ id: id });

            if(inquiry == null){
                res.status(404).json({
                    message: "inquiry not found"
                });
                return;
            }
        }else {

            if (inquiry.email == req.user.email) {

                await Inquiry.deleteOne({ id: id });
                res.json({
                    message: "inquiry deleted successfully"
                });
                return;
            }else{
                res.status(403).json({
                    message: "you are not authorized to do this action"
                });
                return
            }
        }
   

    }catch (e) {
        res.status(500).json({
            error: "inquiry deletion failed"
        });
    }
}
