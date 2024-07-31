import express from "express"
import { getAllOrders, getOrder, order } from "../controllers/order.controller.js";
const router=express.Router();

router.post("/neworder",order);
router.get("/getallorders",getAllOrders);
router.get("/getorder/:id",getOrder);
export default router;


