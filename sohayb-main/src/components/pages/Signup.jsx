import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from "../../api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    date_of_birth: '' 
  });
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log('Form data updated:', formData.date_of_birth);
  };

  const validateForm = () => {
    if (formData.password !== formData.password_confirmation) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    
    if (!validateForm()) {
      return;
    }

    register(formData, navigate)
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      <div className="w-full h-full md:h-fit md:w-2/6 px-5 py-10 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-center gap-5">
        <div className="bg-olive flex flex-col items-center justify-center md:justify-start p-8 rounded-lg shadow-lg text-white">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          <p>Welcome!</p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <label className="block mb-2 text-sm font-medium text-olive">Name</label>
              <input 
                name="name" 
                onChange={handleChange} 
                type="text" 
                className="w-full p-4 border border-olive rounded-lg mb-4 text-olive focus:outline-none focus:border-olive-dark" 
                placeholder="Enter your name" 
                value={formData.name}
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-olive">Email</label>
              <input 
                name="email"
                onChange={handleChange} 
                type="email" 
                className="w-full p-4 border border-olive rounded-lg mb-4 text-olive focus:outline-none focus:border-olive-dark" 
                placeholder="Enter your email" 
                value={formData.email}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label  className="block mb-2 text-sm font-medium text-olive">Date of Birth</label>
              <input 
              type="date" 
              id="date_of_birth" 
              name="date_of_birth"
              onChange={handleChange} 
              required
              className="w-full p-4 border border-olive rounded-lg mb-4 text-olive focus:outline-none focus:border-olive-dark"
              value={formData.date_of_birth}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-olive">Password</label>
              <input 
                name="password"
                onChange={handleChange} 
                type="password" 
                className="w-full p-4 border border-olive text-olive rounded-lg mb-4 focus:outline-none focus:border-olive-dark" 
                placeholder="Enter your password" 
                value={formData.password}
                required
                minLength="6"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-olive">Confirm Password</label>
              <input 
                name="password_confirmation" 
                onChange={handleChange} 
                type="password" 
                className="w-full p-4 border border-olive text-olive rounded-lg mb-4 focus:outline-none focus:border-olive-dark" 
                placeholder="Confirm your password" 
                value={formData.password_confirmation}
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-olive text-white p-5 rounded-lg hover:bg-olive-dark hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-4 text-center text-olive">
            Already have an account?{' '}
            <Link to="/login" className="text-blue underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}