import express from "express";
import { createOrder, getOrder, updateOderStatus } from "../Controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.put("/:orderId/:status", updateOderStatus)
orderRouter.get("/", getOrder);

export default orderRouter;