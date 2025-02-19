import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useAuth();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/login`, {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', formData.email);
                setIsAuthenticated(true);

                // Redirect to root instead of /home
                const from = location.state?.from?.pathname || "/";
                navigate(from);
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
                <h1 className='text-white text-3xl mb-8'>Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='text-white block mb-2'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='text-white block mb-2'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <button className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'>Login</button>
                    <span className="text-white mt-4 block text-center">Create a new Account
                        <Link to="/signup" className="text-blue-500 hover:underline ml-1">Sign Up</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;