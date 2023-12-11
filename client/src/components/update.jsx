import React from 'react'
import {useState} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom"

const Update = () => {

    const [emp, setEmp] = useState({
        id:null,
        name:'',
        dept:"",
        desig:"",
        salary:null,
        dob: null,
      
        add:""
    })
    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmp((prev) => ({...prev, [e.target.name] : e.target.value}))
    }
    const empId = location.pathname.split("/")[2]

    const handleClick = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.put("http://localhost:8800/update/"+empId, emp)
            console.log(response);
            navigate("/")
            
        }
        catch(err){
            console.log(err.message);
        }
    }
  return (
    <div className='form forms container'>
        <h3 className='heading emp'>Employee form</h3>
        <label className='form__label'> Enter your Name: <input type="text" onChange={handleChange} name="name"className='form__input'/></label>
        <label className='form__label'> Enter your Department: <input type="text" onChange={handleChange} name="dept"className='form__input'/></label>
        <label className='form__label'> Enter your Designation: <input type="text" onChange={handleChange} name="desig"className='form__input'/></label>
        <label className='form__label'> Enter your Salary: <input type="number" onChange={handleChange} name="salary"className='form__input'/></label>
        <label className='form__label'> Enter your Date-of-Birth: <input type="date"onChange={handleChange} name="dob"className='form__input'/></label>
        <label className='form__label'> Enter your Address: <input type="text"onChange={handleChange} name="add"className='form__input'/></label>
        <button onClick = {handleClick}>Update Employee</button>
    </div>
  )
}


export default Update;