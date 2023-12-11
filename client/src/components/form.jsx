import React from 'react'
import {useState} from "react";
import axios from "axios";

const Form = () => {

    const [emp, setEmp] = useState({
        id:null,
        name:'',
        dept:"",
        desig:"",
        salary:null,
        dob: null,
        add:""
    })

    const handleChange = (e) => {
        setEmp((prev) => ({...prev, [e.target.name] : e.target.value}))
    }
    const handleClick = async (e) => {
        e.preventDefault();
        try{
            const response = axios.post("http://localhost:8800/addEmp", emp)
            console.log(response);
        }
        catch(err){
            console.log(err.message);
        }
    }

  return (
    <div className='form'>
        <label > Enter your Emp Id: <input type="number" onChange={handleChange} name="id" /></label>
        <label > Enter your Name: <input type="text" onChange={handleChange} name="name"/></label>
        <label > Enter your Department: <input type="text" onChange={handleChange} name="dept"/></label>
        <label > Enter your Designation: <input type="text" onChange={handleChange} name="desig"/></label>
        <label > Enter your Salary: <input type="number" onChange={handleChange} name="salary"/></label>
        <label > Enter your Date-of-Birth: <input type="date"onChange={handleChange} name="dob"/></label>
        <label > Enter your Address: <input type="text"onChange={handleChange} name="add"/></label>
        <button onClick = {handleClick}>Add Employee</button>
    </div>
  )
}

export default Form;
