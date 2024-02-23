import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [emp, setEmp] = useState({});
  const [errors, setErrors] = useState({});
  
  const location = useLocation();
  const empId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8000/updateEmp/" + empId
      );
      const formattedData = response.data.map((employee) => ({
        ...employee,
        dob: formatDob(employee.dob),
        doj: formatDob(employee.doj),
      }));
      setEmp(formattedData[0]);
    };
    fetch();
  }, []);

  const formatDob = (dob) => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp((prev) => ({ ...prev, [name]: value }));
    
    // Validate and set errors
    let error = "";
    if (value.trim() === "") {
      error = "Please fill this field";
    } else if (name === "salary" && (isNaN(value) || value.length > 8 || Number(value) < 0)) {
      error = "Salary must be a non-negative number with at most 8 digits";
    } else if (name === "dob" && getAge(value) < 18) {
      error = "Employee must be at least 18 years old";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      console.log("Please fill in all required fields correctly");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/update/" + empId,
        emp
      );
      console.log("clicked");
      console.log(response);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  
  return (
    <div className="form forms container">
      <h3 className="heading emp">Employee Update form</h3>
      <label className="form__label">
        Name:
        <input
          type="text"
          onChange={handleChange}
          name="name"
          className="form__input"
          value={emp.name}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>
      <label className="form__label">
        Department:
        <select
          name="dept"
          onChange={handleChange}
          required
          className="form__input"
          value={emp.dept}
        >
          <option value=""></option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
        {errors.dept && <span className="error">{errors.dept}</span>}
      </label>
      <label className="form__label">
        Designation:
        <input
          type="text"
          onChange={handleChange}
          name="desig"
          className="form__input"
          value={emp.desig}
        />
        {errors.desig && <span className="error">{errors.desig}</span>}
      </label>
      <label className="form__label">
        Salary:
        <input
          type="number"
          onChange={handleChange}
          name="salary"
          className="form__input"
          value={emp.salary}
        />
        {errors.salary && <span className="error">{errors.salary}</span>}
      </label>
      <label className="form__label">
        Date-of-Birth:
        <input
          type="date"
          onChange={handleChange}
          name="dob"
          className="form__input"
          value={emp.dob}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </label>
      <label className="form__label">
        Date-Of-Joining:
        <input
          type="date"
          onChange={handleChange}
          name="doj"
          className="form__input"
          value={emp.doj}
        />
        {errors.doj && <span className="error">{errors.doj}</span>}
      </label>
      <label className="form__label">
        Gender:
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
      <button onClick={handleClick}>Update Employee</button>
    </div>
  );
};

export default Update;
