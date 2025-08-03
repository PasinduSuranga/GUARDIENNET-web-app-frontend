import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // clear previous messages

    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      alert('✅ Verification email sent. Please check your inbox.');

      setUser({username: '', email: '', password: ''});
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert('❌ ' + err.response.data.message);
      } else {
        alert('❌ An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2 className="page-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
          required
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          required
        /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
