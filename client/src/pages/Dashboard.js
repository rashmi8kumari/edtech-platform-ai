import React, { useEffect, useState } from 'react';
// Ye axiosInstance ko import kar rahe hain jo humne banaya tha
import axiosInstance from '../utils/axiosInstance';  

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ab token manually nikalne ki jarurat nahi hai
    // AxiosInstance already token attach kar raha hai automatically

    axiosInstance.get('/dashboard')
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.error(err);
        setError("Unauthorized Access. Please login again.");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;

