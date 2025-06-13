import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";  // axiosInstance import kiya

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",  
    password: "",
    preferredLanguage: "English",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        <select name="preferredLanguage" onChange={handleChange} required>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Hinglish">Hinglish</option>
        </select>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

