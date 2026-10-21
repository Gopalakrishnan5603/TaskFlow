import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

mongoose
    .connect("mongodb://localhost:27017/TaskFlow")
    .then(() => {console.log("Successfully connected")})
    .catch((err) => {console.log(err)});

app.listen(3000, () => {
    console.log("Server connected successfully");
})