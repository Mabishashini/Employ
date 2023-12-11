import mysql from "mysql2";
import express from "express";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"TaylorSwift@1989",
    database: "screening"
})

app.use(cors())

app.use(express.json())

app.listen("8800", ()=>{
    console.log("API Working !")
})
