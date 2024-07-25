import express from "express"
import dotenv from "dotenv"
import orderroute from "./routes/order.route.js"
import cors from "cors"

dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/order",orderroute);
app.listen(process.env.PORT,()=>{
    console.log(`app is listening in port ${process.env.PORT}`);
});

