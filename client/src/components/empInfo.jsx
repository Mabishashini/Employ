import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const EmpInfo = () => {
  const [emps, setEmps] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://employeeregister.onrender.com/Emp');
        const formattedData = response.data.map((employee, index) => ({
          ...employee,
          dob: formatDob(employee.dob),
          doj: formatDob(employee.doj),
          serialNumber: index + 1 // Generate dynamic serial numbers starting from 1
        }));
        setEmps(formattedData);
        setFilteredEmps(formattedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Update serial numbers when filteredEmps changes
    setFilteredEmps(prevFilteredEmps =>
      prevFilteredEmps.map((employee, index) => ({
        ...employee,
        serialNumber: index + 1
      }))
    );
  }, [filteredEmps]);

  const formatDob = (dob) => {
    const date = new Date(dob);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? `0${day}` : day}-${month < 10 ? `0${month}` : month}-${year}`;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://employeeregister.onrender.com/deleteEmp/${id}`);
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
    let filtered;
    if (category === 'gender') {
      filtered = emps.filter((emp) => emp.add.toLowerCase() === value.toLowerCase());
    } else {
      filtered = emps.filter((emp) => {
        const categoryValue = emp[category];
        if (categoryValue) {
          return categoryValue.includes(value);
        }
        return false;
      });
    }
    setFilteredEmps(filtered);
  };

  const handleFilterCategoryChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    // Reset filter value when category changes
    setFilterValue('');
  };

  const handleFilterValueChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    if (!filterCategory) {
      // If no category is selected, perform search operation
      const filtered = emps.filter((emp) => {
        // Check if any field contains the search value
        return Object.values(emp).some((field) =>
          field.toString().toLowerCase().includes(value.toLowerCase())
        );
      });
      setFilteredEmps(filtered);
    } else {
      // If a category is selected, filter based on the category and value
      filterEmployees(filterCategory, value);
    }
  };

  const resetFilter = () => {
    setFilterCategory('');
    setFilterValue('');
    setFilteredEmps(emps);
  };

  const renderFilterDropdown = () => {
    if (filterCategory === 'dept') {
      return (
        <select
          className="filterDropdown"
          value={filterValue}
          onChange={handleFilterValueChange}
        >
          <option value="">Select Department</option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
        </select>
      );
    } else if (filterCategory === 'gender') {
      return (
        <select
          className="filterDropdown"
          value={filterValue}
          onChange={handleFilterValueChange}
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      );
    } else {
      return (
        <input
          type="text"
          className="filterInput"
          placeholder="Search"
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      );
    }
  };

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmps.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredEmps.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
        {renderFilterDropdown()}
        <button className="resetButton" onClick={resetFilter}>
          Reset
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td className="empInfo__head">Serial Number</td>
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
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.serialNumber}</td>
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
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {Math.ceil(filteredEmps.length / itemsPerPage)}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredEmps.length / itemsPerPage)}>Next</button>
      </div>
      <button className="addButton1">
        <Link to="/addEmployee" className="addButton mx-auto">
          Add Employee
        </Link>
      </button>
    </div>
  );
};

export default EmpInfo;
