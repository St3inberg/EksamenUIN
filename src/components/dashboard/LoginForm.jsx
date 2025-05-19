
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';


export default function LoginForm() {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError('');
  };

  const validateForm = () => {
    if (!loginForm.email || !loginForm.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!loginForm.password || loginForm.password.length < 4) {
      setError('Password must be at least 4 characters');
      return false;
    }
    
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate authentication delay
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
      <form onSubmit={handleLogin} className="login-form" aria-labelledby="login-heading">
        <h2 id="login-heading" className="visually-hidden">Login Form</h2>
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={loginForm.email}
            onChange={handleInputChange}
            required 
            aria-required="true"
            aria-invalid={error && error.includes('email')}
            autoComplete="email"
            placeholder="Enter your email"
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
            aria-required="true"
            aria-invalid={error && error.includes('password')}
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Logging in...' : 'Login / Register'}
        </button>
        <p className="login-info">
          This is a mock login. Any email and password (min 4 characters) will work.
        </p>
      </form>
    </div>
  );
}