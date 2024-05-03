import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        address: '',
        gender: '',
        dob: '',
        doj: '',
        salary: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                address: '',
                gender: '',
                dob: '',
                doj: '',
                salary: ''
            });
            alert('User registered successfully');
            navigate('/admin/user-management');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    {/* <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Select your role" required /> */}
                    <select name="role" value={formData.role} onChange={handleInputChange} required>
                        <option value="" disabled selected>Please select</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter your address" required />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                        <option value="" disabled selected>Please select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                        <option value="Undisclosed">Undisclosed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>DOB:</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label>DOJ:</label>
                    <input type="date" name="doj" value={formData.doj} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label>Salary (₹):</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} min="0" required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;