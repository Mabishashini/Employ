import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';

const EmpInfo = () => {
    const [emps, setEmps] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response =await  axios.get("http://localhost:8800/Emp");
                const formattedData = response.data.map((employee) => ({...employee, dob: formatDob(employee.dob)}))
                setEmps(formattedData);
            }
            catch(err){
                console.log(err)
            }
        }
        fetchData()
    }, [])

    const formatDob =(dob) =>{
        const date = new Date(dob)
        const day = date.getDate()
        const month = date.getMonth()+1;
        const year = date.getFullYear();

        return `${day < 10 ? `0${day}`:day}-${month <10 ? `0${month}`:month}-${year}`
    }
    console.log(emps)

    const handleDelete =async (id) => {
        try {
            await axios.delete("http://localhost:8800/deleteEmp/"+id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='empInfo'>
        <h3 className='emp'>Employee Table</h3>
        <table className='table table-bordered '>
            <thead>
               <tr>
                <td>Emp_Id</td>
                <td>Name</td>
                <td>Department</td>
                <td>Designation</td>
                <td>Salary</td>
                <td>Date-Of-Birth</td>
                <td>Age</td>
                <td>Address</td>
                <td>Delete</td>
                <td>Update</td>
               </tr>
            </thead>
            <tbody>
                {emps.map((employee)=> (
                    <tr key ={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.dept}</td>
                        <td>{employee.desig}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.dob}</td>
                        <td>{employee.age}</td>
                        <td>{employee.add}</td>
                        <td><DeleteOutlineIcon className='delete' onClick={()=>handleDelete(employee.id)}/></td>
                        <td> <Link to={`update/${employee.id}`}><CreateIcon className='update' /></Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className='addButton1' ><Link to="/addEmployee" className='addButton mx-auto'>Add Employee</Link></button>
    </div>
  )
}

export default EmpInfo;
