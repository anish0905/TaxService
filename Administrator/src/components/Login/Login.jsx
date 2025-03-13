import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const URI = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("Please fill in all fields and select a role.");
      return;
    }

    try {
      const response = await fetch(`${URI}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      // Store data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);

      alert("User logged in successfully");
      navigate("/dashboard");
      
    } catch (error) {
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center w-full"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/XYjWrv36/dark-hexagonal-background-with-gradient-color_79603-1409.jpg')",
      }}
    >
      <div className="relative w-[370px] h-[480px] bg-[#1c1c1c] rounded-[50px_5px] overflow-hidden">
        <form
          className="absolute inset-[2px] bg-[#28292d] p-8 rounded-[50px_5px] flex flex-col z-10"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[#45f3ff] text-[35px] font-medium text-center">
            Sign In
          </h2>
          {error && (
            <div className="text-[#ff0000] text-[15px] text-center mb-4">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="relative w-full mt-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              autoComplete="off"
              className="relative w-full px-3 py-2 bg-transparent text-white text-lg outline-none border-none peer"
            />
            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-[#88d1d6] transition-all duration-500 peer-focus:h-[44px] peer-focus:bg-[#030303]/50 rounded-md"></i>
          </div>

          {/* Password Input */}
          <div className="relative w-full mt-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your Password"
              autoComplete="off"
              className="relative w-full px-3 py-2 bg-transparent text-white text-lg outline-none border-none peer"
            />
            <i className="absolute left-0 bottom-0 w-full h-[2px] bg-[#45f3ff] transition-all duration-500 peer-focus:h-[44px] peer-focus:bg-[#030303]/50 rounded-md"></i>
          </div>

          {/* Role Selection */}
          <div className="relative w-full mt-6 flex items-center gap-4">
            <label className="flex items-center gap-2 text-white text-lg">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                className="w-5 h-5"
              />
              Admin
            </label>
            <label className="flex items-center gap-2 text-white text-lg">
              <input
                type="radio"
                name="role"
                value="subAdmin"
                checked={role === "subAdmin"}
                onChange={(e) => setRole(e.target.value)}
                className="w-5 h-5"
              />
              Subadmin
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-8 text-[20px] font-semibold bg-[#45f3ff] py-2 rounded-full hover:bg-gradient-to-r from-[#45f3ff] to-[#d9138a] transition-all active:opacity-80"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
