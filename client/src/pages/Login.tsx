import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('jwt_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/articles');
    } catch {
      setError('Network error. Is the server running on port 5000?');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      setSuccess('Registration successful! You can now login.');
      setMode('login');
      setName('');
    } catch {
      setError('Network error. Is the server running on port 5000?');
    }
    setLoading(false);
  };

  return (
    <div data-testid="login-page" style={{ maxWidth: 420, margin: '40px auto' }}>
      <div className="card">
        <h1 className="page-title" data-testid="login-title" style={{ textAlign: 'center', marginBottom: 8 }}>
          {mode === 'login' ? '🔐 Login' : '📝 Register'}
        </h1>
        <p className="help-text" style={{ textAlign: 'center', marginBottom: 24 }} data-testid="login-subtitle">
          {mode === 'login'
            ? 'Sign in to manage your articles.'
            : 'Create a new account to get started.'}
        </p>

        {error && (
          <div style={{ padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 6, marginBottom: 16 }} data-testid="login-error" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding: 12, background: '#e8f5e9', color: '#2e7d32', borderRadius: 6, marginBottom: 16 }} data-testid="login-success" role="status">
            {success}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} data-testid="login-form">
            <div className="form-group">
              <label htmlFor="login-email" data-testid="login-email-label">Email</label>
              <input
                id="login-email"
                className="form-control"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                data-testid="login-email"
                data-test="login-email"
                aria-label="Email"
                title="Email"
                tabIndex={0}
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password" data-testid="login-password-label">Password</label>
              <input
                id="login-password"
                className="form-control"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
                data-testid="login-password"
                data-test="login-password"
                aria-label="Password"
                title="Password"
                tabIndex={0}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 8 }}
              disabled={loading}
              data-testid="login-button"
              data-test="login-button"
              aria-label="Login"
              title="Login"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} data-testid="register-form">
            <div className="form-group">
              <label htmlFor="register-name" data-testid="register-name-label">Name</label>
              <input
                id="register-name"
                className="form-control"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter Full Name"
                required
                data-testid="register-name"
                data-test="register-name"
                aria-label="Name"
                title="Name"
                tabIndex={0}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-email" data-testid="register-email-label">Email</label>
              <input
                id="register-email"
                className="form-control"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
                data-testid="register-email"
                data-test="register-email"
                aria-label="Email"
                title="Email"
                tabIndex={0}
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-password" data-testid="register-password-label">Password</label>
              <input
                id="register-password"
                className="form-control"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
                data-testid="register-password"
                data-test="register-password"
                aria-label="Password"
                title="Password"
                tabIndex={0}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 8 }}
              disabled={loading}
              data-testid="register-button"
              data-test="register-button"
              aria-label="Register"
              title="Register"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: 20 }} data-testid="auth-toggle">
          {mode === 'login' ? (
            <p className="help-text">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 'inherit' }}
                data-testid="switch-to-register"
                data-test="switch-to-register"
                aria-label="Switch to Register"
                title="Switch to Register"
              >
                Register here
              </button>
            </p>
          ) : (
            <p className="help-text">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: 'inherit' }}
                data-testid="switch-to-login"
                data-test="switch-to-login"
                aria-label="Switch to Login"
                title="Switch to Login"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
