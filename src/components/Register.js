import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) setMsg('Registration successful!');
      else setMsg(data.error || 'Registration failed');
    } catch {
      setMsg('Network error');
    }
  };

  return (
    <form onSubmit={handleRegister} style={formStyle}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Register</button>
      <div>{msg}</div>
    </form>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '250px',
  margin: '20px auto',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px'
};
const inputStyle = {
  padding: '8px',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #aaa'
};
const buttonStyle = {
  padding: '10px',
  fontSize: '1rem',
  background: '#4f46e5',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Register;