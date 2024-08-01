import express from "express"
import dotenv from "dotenv"
import orderroute from "./routes/order.route.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import bodyParser from "body-parser"


dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/order",orderroute);

app.use(bodyParser.json());

app.post("/api/admin/signin", (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log("Token ",token);
        res.status(200).json({ message: "Login Successful", token });
    } else {
        res.status(401).json({ error: "Invalid Credentials" });
    }
});


app.listen(process.env.PORT,()=>{
    console.log(`app is listening in port ${process.env.PORT}`);
});

