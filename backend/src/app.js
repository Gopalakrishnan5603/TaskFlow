import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

const port = process.env.PORT || 5000;

const startServer = async() => {
    await connectDB();

    app.listen(port, () => {
        console.log("Server running on port ",port);
    })
}

startServer();