"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "./components/navbar";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Dummy username and password for demonstration
  const correctUsername = 'user';
  const correctPassword = 'password';
  
  const handleLogin = () => {
    if (username === correctUsername && password === correctPassword) {
      // Successful login
      console.log('Login successful');
      router.push('/dashboard')
    } else {
      // Invalid credentials
     alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <div className="login-form">
        <div className="bg-[#406AFF] gap-10 p-4 w-screen h-screen flex flex-col items-center justify-center">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 xl:w-[40rem] w-80 h-12 text-black text-xl rounded-xl"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-80 xl:w-[40rem] px-4 h-12 text-black text-xl rounded-xl"
          />
          <button
            onClick={handleLogin}
            className="bg-white p-4 px-8 rounded-3xl hover:scale-105 transition-all text-[#406AFF] text-2xl font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
