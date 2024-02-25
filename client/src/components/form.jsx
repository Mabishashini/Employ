import React, { useState } from "react";
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

  const [errors, setErrors] = useState({
    id: "",
    name: "",
    dept: "",
    desig: "",
    salary: "",
    dob: "",
    doj: "",
    add: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // Remove error when user starts typing
    const newErrors = { ...errors };
    newErrors[e.target.name] = "";
    setErrors(newErrors);

    if (e.target.name === "dob") {
      const dobDate = new Date(e.target.value);
      const ageDiff = new Date().getFullYear() - dobDate.getFullYear();
      if (ageDiff < 18) {
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "Age should be at least 18 years old" }));
        return;
      }
    }

    // Validate salary for negative value and length
    if (e.target.name === "salary") {
      const value = e.target.value;
      if (value < 0) {
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "Salary cannot be negative" }));
      } else if (String(value).length > 8) {
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "Salary should be at most 8 digits" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
      }
    }

    setEmp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check for empty fields
    let formIsValid = true;
    const newErrors = { ...errors };

    Object.keys(emp).forEach((key) => {
      if (!emp[key]) {
        formIsValid = false;
        newErrors[key] = "Please fill this field";
      } else {
        newErrors[key] = "";
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    try {
      const response = await axios.post("https://employee-register-nine.vercel.app/addEmp", emp);
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="form forms container">
      <h3 className="heading emp">Employee Registration form</h3>
      <label className="form__label">
        Enter your Employee Id:
        <input
          type="number"
          onChange={handleChange}
          name="id"
          className="form__input"
        />
        {errors.id && <span className="error">{errors.id}</span>}
      </label>
      <label className="form__label">
        Enter your Name:
        <input
          type="text"
          onChange={handleChange}
          name="name"
          className="form__input"
        />
        {errors.name && <span className="error">{errors.name}</span>}
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
        {errors.dept && <span className="error">{errors.dept}</span>}
      </label>
      <label className="form__label">
        Enter your Designation:
        <input
          type="text"
          onChange={handleChange}
          name="desig"
          className="form__input"
        />
        {errors.desig && <span className="error">{errors.desig}</span>}
      </label>
      <label className="form__label">
        Enter your Salary:
        <input
          type="number"
          onChange={handleChange}
          name="salary"
          className="form__input"
        />
        {errors.salary && <span className="error">{errors.salary}</span>}
      </label>
      <label className="form__label">
        Enter your Date-of-Birth:
        <input
          type="date"
          onChange={handleChange}
          name="dob"
          className="form__input"
          max={new Date().toISOString().split("T")[0]} // Set max attribute to today's date
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </label>
      <label className="form__label">
        Enter your Date-Of-Joining:
        <input
          type="date"
          onChange={handleChange}
          name="doj"
          className="form__input"
          max={new Date().toISOString().split("T")[0]} // Set max attribute to today's date
        />
        {errors.doj && <span className="error">{errors.doj}</span>}
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
        {errors.add && <span className="error">{errors.add}</span>}
      </label>
      <button onClick={handleClick}>Add Employee</button>
    </div>
  );
};

export default Form;
