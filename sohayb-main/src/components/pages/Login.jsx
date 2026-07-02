import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import api from '../../api';
import { useAuthStore } from '../../store/authStore';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, loading, error } = useAuthStore();  
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData, navigate);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-full md:h-fit md:w-2/6 p-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center gap-5">
        <div className="bg-olive flex flex-col items-center justify-center p-8 rounded-lg shadow-lg text-white">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          {loading ? (<p>Loading...</p>) : (<p>Welcome back</p>)}
        </div>
        <div>
          {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <div>
              <label className="block mb-2 text-sm font-medium text-olive">Email</label>
              <input 
                name='email' 
                onChange={handleChange} 
                type="email" 
                className="w-full p-4 border border-olive rounded-lg mb-4 text-olive" 
                placeholder="Enter your email" 
                value={formData.email}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-olive">Password</label>
              <input 
                name='password' 
                onChange={handleChange} 
                type="password" 
                className="w-full p-4 border border-olive text-olive rounded-lg mb-4" 
                placeholder="Enter your password" 
                value={formData.password}
                required
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-olive text-white py-5 md:p-2 rounded-lg hover:bg-olive-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-olive">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-blue underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}