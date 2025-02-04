import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function SIgnup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post('http://localhost:8000/api/v1/signup', formData);
            if (response.data.success) {
                navigate("/login");
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
                    <div className="mb-4">
                        <label htmlFor="name" className="text-white block mb-2">Name</label>
                        <input
                            type="text"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            autoFocus
                            placeholder='Enter your name'
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-2">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="text-white block mb-2">Password</label>
                        <input
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                    <span className="text-white mt-4 block text-center">Already have an account?
                        <Link to="/login" className="text-blue-500 hover:underline ml-1">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default SIgnup;