import React from 'react'

const Form = () => {
  return (
    <div className='form'>
        <label > Enter your Emp Id: <input type="number" /></label>
        <label > Enter your Name: <input type="text" /></label>
        <label > Enter your Department: <input type="text" /></label>
        <label > Enter your Designation: <input type="text" /></label>
        <label > Enter your Salary: <input type="number" /></label>
        <label > Enter your Date-of-Birth: <input type="date" /></label>
        <label > Enter your Address: <input type="text" /></label>
        <button>Add Employee</button>
    </div>
  )
}

export default Form;
