import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [emp, setEmp] = useState({
    id: null,
    name: "",
    dept: "",
    desig: "",
    salary: null,
    dob: null,
    doj: null,
    add: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();

    const today = new Date();
    const dobDate = new Date(emp.dob);
    const ageDiff = today.getFullYear() - dobDate.getFullYear();
    const dobValid = dobDate <= today && ageDiff >= 18;
  
    // Validate salary
    const salaryValid = String(emp.salary).length <= 8;
  
    if (!dobValid) {
      alert("Date of birth must be in the past and age should be at least 18 years old.");
      return;
    }
  
    if (!salaryValid) {
      alert("Salary should be within 8 digits.");
      return;
    }

    try {
      const response = axios.post("http://localhost:8000/addEmp", emp);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="form forms container">
      <h3 className="heading emp">Employee Registeration form</h3>
      <label className="form__label">
        Enter your Employee Id:
        <input
          type="number"
          onChange={handleChange}
          name="id"
          className="form__input"
        />
      </label>
      <label className="form__label">
        Enter your Name:
        <input
          type="text"
          onChange={handleChange}
          name="name"
          className="form__input"
        />
      </label>
      <label className="form__label">
        Enter your Department:
        <select
          name="dept"
          onChange={handleChange}
          required
          className="form__input"
        >
          <option value=""></option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
      </label>
      <label className="form__label">
        Enter your Designation:
        <input
          type="text"
          onChange={handleChange}
          name="desig"
          className="form__input"
        />
      </label>
      <label className="form__label">
        Enter your Salary:
        <input
          type="number"
          onChange={handleChange}
          name="salary"
          className="form__input"
        />
      </label>
      <label className="form__label">
        Enter your Date-of-Birth:
        <input
          type="date"
          onChange={handleChange}
          name="dob"
          className="form__input"
        />
      </label>
      <label className="form__label">
        Enter your Date-Of-Joining:
        <input
          type="date"
          onChange={handleChange}
          name="doj"
          className="form__input"
        />
      </label>
      <label className="form__label">
        Select your Gender:
        <label>
          <input
            type="radio"
            name="add"
            value="male"
            checked={emp.add === "male"}
            onChange={handleChange}
            className="form__input"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="add"
            value="female"
            checked={emp.add === "female"}
            onChange={handleChange}
            className="form__input"
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="add"
            value="other"
            checked={emp.add === "other"}
            onChange={handleChange}
            className="form__input"
          />
          Other
        </label>
      </label>
      <button onClick={handleClick}>Add Employee</button>
    </div>
  );
};

export default Form;
