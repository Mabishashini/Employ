import mysql from "mysql2";
import express from "express";
import cors from "cors";
import fs from "fs"

const ca = [fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")];
const port = process.env.port || 8000;

const app = express();
const db = mysql.createConnection({
  host: "mabi-server.mysql.database.azure.com",
  user: "Mabishashini",
  password: "TaylorSwift@1989",
  database: "screening",
  ssl :{
    ca: ca
  }
});

app.use(cors({
  origin: ['https://employee-register-nine.vercel.app', 'http://localhost:3000']
}));

app.use(express.json());

app.post("/addEmp", (req, res) => {
  const q =
    "INSERT INTO employees (`id`,`name`,`dept`, `desig`, `dob`, `salary`, `add`,`age`,`doj`,`exp`) VALUES(?)";
  const dob = req.body.dob;
  const age = calculateAge(dob);
  
  
  const doj = req.body.doj;
  const experience = calculateAge(doj);

  const values = [
    req.body.id,
    req.body.name,
    req.body.dept,
    req.body.desig,
    req.body.dob,
    req.body.salary,
    req.body.add,
    age,
    req.body.doj,
    experience,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Employee has been successfully added");
  });
});

const calculateAge = (dob) => {
  const current = new Date();
  const birth = new Date(dob);
  const age = current.getFullYear() - birth.getFullYear();
  return age;
};

app.get("/Emp", (req, res) => {
  const q = "SELECT * FROM employees";

  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE employees SET `name` = ? , `dept` =? , `desig` =?, `dob` =?, `salary` =?, `add` =?, `age` =?, `doj`=?,`exp`=? WHERE id = ?";
  const dob = req.body.dob;
 
  const age = calculateAge(dob);
  const doj = req.body.doj;
  const experience = calculateAge(doj);
  const values = [
   
    req.body.name,
    req.body.dept,
    req.body.desig,
    req.body.dob,
    req.body.salary,
    req.body.add,
    age,
    req.body.doj,
    experience
  ];

  db.query(q, [...values, id], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Book has been updated successfully");
    }
  });
});

app.delete("/deleteEmp/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM employees WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Employee has been deleted successfully");
  });
});


app.get("/updateEmp/:id",(req,res) => {
    const id = req.params.id;
    const q = "SELECT * FROM employees WHERE id = ?"

    db.query(q,[id],(err,data) => {
        if(err){
            return res.json(err)
        }
        
        return res.json(data)
    })
})

app.listen(port, () => {
  console.log("API Working !");
});
