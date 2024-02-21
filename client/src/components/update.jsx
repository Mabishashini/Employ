import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [emp, setEmp] = useState({});

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
    setEmp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(emp);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:8000/update/" + empId,
        emp
      );
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
      </label>
      <label className="form__label">
        Department:
        <select
          name="dept"
          onChange={handleChange}
          required
          className="form__input"
        >
          <option value="">{emp.dept}</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>
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
      </label>
      <button onClick={handleClick}>Update Employee</button>
    </div>
  );
};

export default Update;
