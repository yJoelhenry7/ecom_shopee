import express from "express"
import dotenv from "dotenv"
import orderroute from "./routes/order.route.js"
dotenv.config();
const app=express();
app.use(express.json());
app.use("/api/neworder",orderroute);
app.listen(process.env.PORT,()=>{
    console.log(`app is listening in port ${process.env.PORT}`);
});

