import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';



function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.employee);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-UK', options).replace(/,/g, '');
    }

    return (
        <div className="profile-page-container">
            <h2>Employee profile</h2>
            
            <table className="profile-page-table">
                <tr>
                    <td>Id</td>
                    <td>{profileInfo.id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{profileInfo.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{profileInfo.email}</td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td>{profileInfo.role}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{profileInfo.address}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{profileInfo.gender}</td>
                </tr>
                <tr>
                    <td>DOB</td>
                    <td>{formatDate(profileInfo.dob)}</td>
                </tr>
                <tr>
                    <td>DOJ</td>
                    <td>{formatDate(profileInfo.doj)}</td>
                </tr>
                <tr>
                    <td>Salary (₹)</td>
                    <td>{profileInfo.salary}</td>
                </tr>
            </table>
            <br></br>
            {profileInfo.role === "ADMIN" && (
                <button><Link to={`/update-user/${profileInfo.id}`}>Update this Profile</Link></button>
            )}
        </div>
    );
}

export default ProfilePage;