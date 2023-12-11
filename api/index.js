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

app.post("/addEmp", (req,res) => {
    const q = "INSERT INTO employees (`id`,`name`,`dept`, `desig`, `dob`, `salary`, `add`) VALUES(?)"
    const values = [req.body.id, req.body.name, req.body.dept, req.body.desig, req.body.dob, req.body.salary, req.body.add]

    db.query(q,[values],(err,data) => {
        if(err){
            return res.json(err)
        }
        return res.json("Employee has been successfully added");
    })
})

app.listen("8800", ()=>{
    console.log("API Working !")
})
