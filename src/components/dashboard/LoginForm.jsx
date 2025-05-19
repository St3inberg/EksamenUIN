import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    
    setTimeout(() => {
      setLoading(false);
      
      
      login({
        name: loginForm.email.split('@')[0],
        email: loginForm.email
      });
    }, 500);
  };
  return (
    <div className="dashboard-page login-page">
      <h1>Login to Dashboard</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={loginForm.email}
            onChange={handleInputChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={loginForm.password}
            onChange={handleInputChange}
            required 
          />
        </div>
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login / Register'}
        </button>
      </form>
    </div>
  );
}
