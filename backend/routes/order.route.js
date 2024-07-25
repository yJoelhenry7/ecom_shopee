import express from "express"
import { getAllOrders, order } from "../controllers/order.controller.js";
const router=express.Router();

router.post("/neworder",order);
router.get("/getallorders",getAllOrders);
export default router;


