import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
 // Import the CSS file

const EmpInfo = () => {
  const [emps, setEmps] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Emp');
        const formattedData = response.data.map((employee) => ({
          ...employee,
          dob: formatDob(employee.dob),
          doj: formatDob(employee.doj),
        }));
        setEmps(formattedData);
        setFilteredEmps(formattedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const formatDob = (dob) => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/deleteEmp/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = () => {
    setIsAscending((prevState) => !prevState);
    setFilteredEmps((prevEmps) =>
      [...prevEmps].sort((a, b) => (isAscending ? a.id - b.id : b.id - a.id))
    );
  };

  const handleNameSort = () => {
    setIsAscending((prevState) => !prevState);
    setFilteredEmps((prevEmps) =>
      [...prevEmps].sort((a, b) =>
        isAscending
          ? a.name.toLowerCase().localeCompare(b.name.toLowerCase())
          : b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      )
    );
  };

  const handleSalarySort = () => {
    setIsAscending((prevState) => !prevState);
    setFilteredEmps((prevEmps) =>
      [...prevEmps].sort((a, b) =>
        isAscending ? a.salary - b.salary : b.salary - a.salary
      )
    );
  };

  const filterEmployees = (category, value) => {
    if (!category || !value) {
      setFilteredEmps(emps);
      return;
    }

    const filtered = emps.filter((emp) => {
      const categoryValue = emp[category];
      if (categoryValue) {
        return categoryValue === value;
      }
      return false;
    });
    setFilteredEmps(filtered);
  };

  const handleFilterCategoryChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
  };

  const handleFilterValueChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    filterEmployees(filterCategory, value);
  };

  return (
    <div className="empInfo">
      <h3 className="emp">Employee Details</h3>
      <div className="filterContainer">
        <select className="filterDropdown" onChange={handleFilterCategoryChange}>
          <option value="">Select Category</option>
          <option value="dept">Department</option>
          <option value="gender">Gender</option>
        </select>
        <input
          type="text"
          className="filterInput"
          placeholder="Enter Value"
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td className="empInfo__head" onClick={handleSort}>
              Emp Id {isAscending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </td>
            <td className="empInfo__head" onClick={handleNameSort}>
              Name {isAscending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </td>
            <td className="empInfo__head">Department</td>
            <td className="empInfo__head">Designation</td>
            <td className="empInfo__head" onClick={handleSalarySort}>
              Salary {isAscending ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </td>
            <td className="empInfo__head">Date-Of-Birth</td>
            <td className="empInfo__head">Age</td>
            <td className="empInfo__head">Date-Of-Joining</td>
            <td className="empInfo__head">Gender</td>
            <td>Delete</td>
            <td>Update</td>
          </tr>
        </thead>
        <tbody>
          {filteredEmps.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.dept}</td>
              <td>{employee.desig}</td>
              <td>{employee.salary}</td>
              <td>{employee.dob}</td>
              <td>{employee.age}</td>
              <td>{employee.doj}</td>
              <td>{employee.add}</td>
              <td>
                <DeleteOutlineIcon className="delete" onClick={() => handleDelete(employee.id)} />
              </td>
              <td>
                <Link to={`update/${employee.id}`}>
                  <CreateIcon className="update" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="addButton1">
        <Link to="/addEmployee" className="addButton mx-auto">
          Add Employee
        </Link>
      </button>
    </div>
  );
};

export default EmpInfo;
