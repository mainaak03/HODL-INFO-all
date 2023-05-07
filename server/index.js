import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";
import morgan from "morgan";
import Info from "./models/info.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
dotenv.config();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

mongoose
    .connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {console.log("Connected to database.");})
    .then(() => {
        app.listen(PORT, () => {console.log("Server started on port "+PORT)});
    })
    .catch((err) => {console.log(err);})


app.get("/", async (req,res) => {
    const response=await fetch("https://api.wazirx.com/api/v2/tickers");
    var data=await response.json();

    let x = Object.entries(data); 
    let y = x.slice(0,10);
    let final_data = {};
    y.forEach(i => final_data[i[0]] = i[1]);
    // console.log(z);

    const info=new Info({
        data: final_data
    });
    info.save();

    res.status(200).json(info);
});