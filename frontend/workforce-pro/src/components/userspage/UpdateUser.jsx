import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();


  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    address: '',
    gender: '',
    dob: '',
    doj: '',
    salary: ''
  });

  useEffect(() => {
    fetchEmployeeById(userId); // Pass the userId to fetchEmployeeById
  }, [userId]); //when ever there is a change in userId, run this

// Function to format the date string
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    // Pad month and day with leading zeros if necessary
    if (month.length === 1) {
        month = '0' + month;
    }
    if (day.length === 1) {
        day = '0' + day;
    }

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}



  const fetchEmployeeById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      let { name, email, role, address, gender, dob, doj, salary } = response.employee;
      
      dob = formatDate(dob);
      doj = formatDate(doj);
      
      setEmployee({ name, email, role, address, gender, dob, doj, salary });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this employee?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const res = await UserService.updateUser(userId, employee, token);
        console.log(res)
        // Redirect to profile page or display a success message
        navigate("/admin/user-management")
      }

    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error)
    }
  };

  return (
    <div className="auth-container">
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={employee.role} onChange={handleInputChange} required>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={employee.address} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleInputChange} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Undisclosed">Undisclosed</option>
          </select>
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input type="date" name="dob" value={employee.dob} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>DOJ:</label>
          <input type="date" name="doj" value={employee.doj} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Salary (₹):</label>
          <input type="number" name="salary" value={employee.salary} onChange={handleInputChange} min="0" required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;