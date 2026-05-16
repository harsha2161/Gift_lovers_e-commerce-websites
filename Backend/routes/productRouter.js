import express from "express"
import { deleteProduct, getProduct, getProductById, saveProduct, searchProducts, updateProduct } from "../Controllers/productController.js"

const productRouter = express.Router()

productRouter.post("/addProduct", saveProduct);
productRouter.get("/", getProduct);
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId",updateProduct);
productRouter.get("/:productId", getProductById);
productRouter.get("/search/:query", searchProducts);

export default productRouter;
