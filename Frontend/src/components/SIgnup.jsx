import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/signup`, {
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            if (response.data.success) {
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
            <div className='bg-gray-900 px-8 py-12 rounded-lg w-full max-w-md mx-auto flex flex-col items-center justify-center shadow-lg'>
                <h1 className="text-white text-3xl mb-8">Sign Up</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleSubmit}>

                    {/* Name Input */}
                    <div className="mb-4">
                        <label htmlFor="name" className="text-white block mb-2">Name</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <input
                                type="text"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                                placeholder='Enter your name'
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-2">Email</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your Email'
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="text-white block mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-400" />
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-col items-center">
                        <label htmlFor="role" className="text-white block mb-2 text-center">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>

                    <span className="text-white mt-4 block text-center">
                        Already have an account?
                        <Link to="/login" className="text-blue-500 hover:underline ml-1">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
