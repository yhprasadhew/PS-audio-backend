import express from 'express';
import { addProduct ,getProducts,updateProduct, delProduct} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/",addProduct)
productRouter.get("/",getProducts)  
productRouter.patch("/:Key",updateProduct)
productRouter.delete("/:Key",delProduct)   

export default productRouter;