import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProduct, getAllProducts, getProductDetails, updateProduct,deleteProduct } from "../controllers/productControllers.js";

const productRouter = Router();

//POST Routes
productRouter.post("/new",createProduct);

//GET Routes
productRouter.get("/all",getAllProducts);
productRouter.get("/:id",getProductDetails);

//PUT Route
productRouter.put("/:id",updateProduct);

//DELETE Route
productRouter.delete("/:id",deleteProduct);

export default productRouter;
