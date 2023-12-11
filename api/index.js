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
    const q = "INSERT INTO employees (`id`,`name`,`dept`, `desig`, `dob`, `salary`, `add`,`age`) VALUES(?)"
    const dob = req.body.dob;
    const age = calculateAge(dob);
    
    const values = [req.body.id, req.body.name, req.body.dept, req.body.desig, req.body.dob,  req.body.salary, req.body.add,age]
    console.log(values)
    db.query(q,[values],(err,data) => {
        if(err){
            return res.json(err)
        }
        return res.json("Employee has been successfully added");
    })
})

const calculateAge =(dob) => {
    const current = new Date();
    const birth = new Date(dob);
    const age = current.getFullYear() - birth.getFullYear();
    return age
}

app.get("/Emp", (req,res) => {
    const q = "SELECT * FROM employees"

    db.query(q, (err,data)=> {
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
})

app.put("/update/:id",(req,res) => {
    const id = req.params.id;
    const q = "UPDATE employees SET `name` = ? , `dept` =? , `desig` =?, `dob` =?, `salary` =?, `add` =?, `age` =? WHERE id = ?" 
    const dob = req.body.dob;
    const age = calculateAge(dob);
    const values =[req.body.id, req.body.name, req.body.dept, req.body.desig, req.body.dob,  req.body.salary, req.body.add,age]
  
    db.query(q,[...values,id],(err,data)=>{
      if(err){
        res.json(err);
      }
      else{
        res.json("Book has been updated successfully");
        console.log(data);
      }
    })
  })

app.delete("/deleteEmp/:id",(req,res) => {
    console.log(req)
    const id = req.params.id;
    const q = "DELETE FROM employees WHERE id = ?"
    db.query(q,[id], (err,data) => {
        if(err){
            return res.json(err);
        }
        return res.json("Employee has been deleted successfully")
    })
})

app.listen("8800", ()=>{
    console.log("API Working !")
})