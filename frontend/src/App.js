import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://54.81.90.255:3001/api/users') // Substitua pelo seu endereço IPv4 público e a porta correta (3001)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://54.81.90.255:3001/api/register', { username, password }); // Substitua pelo seu endereço IPv4 público e a porta correta (3001)
      if (response.data.success) {
        alert('User registered successfully!');
        setIsLoggedIn(true); // Após o registro, o usuário é redirecionado para a página de login
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering user.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://54.81.90.255:3001/api/login', { username, password }); // Substitua pelo seu endereço IPv4 público e a porta correta (3001)
      if (response.data.success) {
        setIsLoggedIn(true);
        alert('Login successful!');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome, {username}!</h1>
        <button onClick={handleLogout}>Logout</button>
        <h2>Users:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login</h1>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <h2>or</h2>
        <h1>Register</h1>
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  }
}

export default App;
