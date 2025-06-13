import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';  // axiosInstance import kiya

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            alert("Login Successful");
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                /><br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

