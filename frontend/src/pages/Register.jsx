import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';// Default import
import { Link } from 'react-router-dom'; // Add this line for Link

export default function Register() {
  const { register } = useContext(AuthContext); // Get the register function from context
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(username, email, password); // Call register function
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      alert("Failed to register.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-white p-4 rounded-xl h-min"
      >
        <h3 className="text-2xl my-4 font-bold font-mono">Register</h3>

        <div className="relative mb-6">
          <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 border border-gray-300 rounded-full"
            placeholder="Enter Username"
            required
          />
        </div>

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
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-orange-600 hover:bg-orange-800 transition-all duration-700 rounded-full text-white text-base font-semibold mb-6"
        >
          Register
        </button>

        <div>
          Already registered? <Link to="/login" className='text-orange-500'>Login</Link>
        </div>
      </form>
    </div>
  );
}
