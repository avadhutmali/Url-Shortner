import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://url-shortner-dr0j.onrender.com/api/user/login",
        { userName, password }
      );

      if (response.status !== 200) {
        const data = response.data;
        setErrorMessage(data.message || 'Login failed.');
        return;
      }

      const data = response.data;
      // Store token securely
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', userName);
      console.log(data);

      navigate('/'); // Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 404) {
        setErrorMessage('Invalid Credentials.');
      } else {
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  const handleNavigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="absolute top-2 right-2 h-10 w-20 p-2 bg-blue-600 text-center rounded-xl cursor-pointer text-white"
        onClick={handleNavigateToSignUp}
      >
        Signup
      </div>
      <div className="p-8 bg-gray-800 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-white">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border-none rounded-md bg-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border-none rounded-md bg-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
