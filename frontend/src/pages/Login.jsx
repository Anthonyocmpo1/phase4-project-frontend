import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom"; // Import Link
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

export default function Login() {
  const { login, authToken } = useContext(AuthContext); // Get login function and authToken from context
  const navigate = useNavigate(); // Initialize useNavigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect to home page if already logged in
  useEffect(() => {
    if (authToken) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [authToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password); // Call login function
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      alert("Invalid login credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-white p-4 rounded-xl h-min"
      >
        <h3 className="text-2xl my-4 font-bold font-mono">Login</h3>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 border border-gray-300 rounded-full"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 border border-gray-300 rounded-full"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-orange-600 hover:bg-orange-800 transition-all duration-700 rounded-full text-white text-base font-semibold mb-6"
        >
          Sign in
        </button>

        <div>
          Not yet registered?{" "}
          <Link to="/register" className="text-orange-500">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
