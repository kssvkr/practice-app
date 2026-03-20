import { useState } from 'react';

const API_BASE = window.location.origin + '/api';

interface ApiResponse {
  status: number;
  data: unknown;
  time: number;
}

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  createdBy: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const codeStyle: React.CSSProperties = {
  background: '#1e1e1e',
  color: '#d4d4d4',
  padding: 14,
  borderRadius: 6,
  fontSize: '0.8rem',
  fontFamily: 'Consolas, Monaco, "Courier New", monospace',
  overflowX: 'auto',
  whiteSpace: 'pre',
  margin: '8px 0',
  lineHeight: 1.5,
};

export default function ApiPlayground() {
  // Auth state
  const [token, setToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Auth form state
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Article form state
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDesc, setArticleDesc] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleTags, setArticleTags] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [articleError, setArticleError] = useState('');
  const [articleSuccess, setArticleSuccess] = useState('');

  const isLoggedIn = !!token;

  // --- Auth handlers ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);
    const start = performance.now();
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      const time = Math.round(performance.now() - start);
      setResponse({ status: res.status, data, time });
      if (!res.ok) { setAuthError(data.error || 'Registration failed'); }
      else { setAuthSuccess('Registration successful! You can now login.'); setMode('login'); }
    } catch {
      setAuthError('Network error. Is the server running?');
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);
    const start = performance.now();
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      const time = Math.round(performance.now() - start);
      setResponse({ status: res.status, data, time });
      if (!res.ok) { setAuthError(data.error || 'Login failed'); }
      else {
        setToken(data.token);
        setUserEmail(data.user?.email || email);
        setAuthSuccess('');
        fetchArticles(data.token);
      }
    } catch {
      setAuthError('Network error. Is the server running?');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setToken('');
    setUserEmail('');
    setArticles([]);
    setResponse(null);
    setArticleError('');
    setArticleSuccess('');
    setEditingId(null);
    clearArticleForm();
  };

  // --- Article handlers ---
  const authHeaders = (): Record<string, string> => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  });

  const fetchArticles = async (tk?: string) => {
    setArticleError('');
    const start = performance.now();
    try {
      const res = await fetch(`${API_BASE}/articles`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tk || token}` },
      });
      const data = await res.json();
      const time = Math.round(performance.now() - start);
      setResponse({ status: res.status, data, time });
      if (res.status === 401) { handleLogout(); return; }
      setArticles(Array.isArray(data) ? data : []);
    } catch {
      setArticleError('Failed to fetch articles.');
    }
  };

  const clearArticleForm = () => {
    setEditingId(null);
    setArticleTitle('');
    setArticleDesc('');
    setArticleContent('');
    setArticleTags('');
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setArticleError('');
    setArticleSuccess('');
    const body = {
      title: articleTitle,
      description: articleDesc,
      content: articleContent,
      tags: articleTags.split(',').map(t => t.trim()).filter(Boolean),
    };
    const start = performance.now();
    try {
      if (editingId) {
        const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(editingId)}`, {
          method: 'PUT', headers: authHeaders(), body: JSON.stringify(body),
        });
        const data = await res.json();
        setResponse({ status: res.status, data, time: Math.round(performance.now() - start) });
        if (!res.ok) { setArticleError(data.error || 'Update failed'); return; }
        setArticleSuccess('Article updated successfully!');
      } else {
        const res = await fetch(`${API_BASE}/articles`, {
          method: 'POST', headers: authHeaders(), body: JSON.stringify(body),
        });
        const data = await res.json();
        setResponse({ status: res.status, data, time: Math.round(performance.now() - start) });
        if (!res.ok) { setArticleError(data.error || 'Create failed'); return; }
        setArticleSuccess('Article created successfully!');
      }
      clearArticleForm();
      fetchArticles();
    } catch {
      setArticleError('Network error');
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setArticleTitle(article.title);
    setArticleDesc(article.description);
    setArticleContent(article.content);
    setArticleTags(article.tags.join(', '));
    setArticleSuccess('');
    setArticleError('');
  };

  const handleDelete = async (id: string) => {
    setArticleError('');
    setArticleSuccess('');
    const start = performance.now();
    try {
      const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(id)}`, {
        method: 'DELETE', headers: authHeaders(),
      });
      const data = await res.json();
      setResponse({ status: res.status, data, time: Math.round(performance.now() - start) });
      if (!res.ok) { setArticleError(data.error || 'Delete failed'); return; }
      setArticleSuccess('Article deleted successfully!');
      if (editingId === id) clearArticleForm();
      fetchArticles();
    } catch {
      setArticleError('Network error');
    }
  };

  // ===================== RENDER =====================
  return (
    <div data-testid="api-playground-page">
      <h1 className="page-title" data-testid="page-title">API Testing Playground</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice API authentication, JWT token handling, and CRUD operations.
        Register → Login → Get Token → Create / Read / Update / Delete Articles.
      </p>

      {/* ===== NOT LOGGED IN: Show Register / Login ===== */}
      {!isLoggedIn && (
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          <div className="card">
            <h2 className="card__title" style={{ textAlign: 'center', marginBottom: 8 }} data-testid="auth-title">
              {mode === 'login' ? '🔐 Login' : '📝 Register'}
            </h2>
            <p className="help-text" style={{ textAlign: 'center', marginBottom: 24 }} data-testid="auth-subtitle">
              {mode === 'login'
                ? 'Sign in with your credentials to get a JWT token.'
                : 'Create a new account to get started.'}
            </p>

            {authError && (
              <div style={{ padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 6, marginBottom: 16 }} data-testid="auth-error" role="alert">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div style={{ padding: 12, background: '#e8f5e9', color: '#2e7d32', borderRadius: 6, marginBottom: 16 }} data-testid="auth-success" role="status">
                {authSuccess}
              </div>
            )}

            {mode === 'register' ? (
              <form onSubmit={handleRegister} data-testid="register-form">
                <div className="form-group">
                  <label htmlFor="reg-name">Name</label>
                  <input id="reg-name" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required data-testid="reg-name-input" aria-label="Name" title="Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-email">Email</label>
                  <input id="reg-email" className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required data-testid="reg-email-input" aria-label="Email" title="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-password">Password</label>
                  <input id="reg-password" className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required data-testid="reg-password-input" aria-label="Password" title="Password" />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading} data-testid="register-btn" aria-label="Register" title="Register" style={{ width: '100%' }}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} data-testid="login-form">
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input id="login-email" className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required data-testid="login-email-input" aria-label="Email" title="Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <input id="login-password" className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required data-testid="login-password-input" aria-label="Password" title="Password" />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading} data-testid="login-btn" aria-label="Login" title="Login" style={{ width: '100%' }}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            )}

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              {mode === 'register' ? (
                <p className="help-text">
                  Already have an account?{' '}
                  <button className="btn btn-sm btn-outline" onClick={() => { setMode('login'); setAuthError(''); setAuthSuccess(''); }} data-testid="switch-to-login" aria-label="Switch to Login" title="Switch to Login">
                    Login
                  </button>
                </p>
              ) : (
                <p className="help-text">
                  Don't have an account?{' '}
                  <button className="btn btn-sm btn-outline" onClick={() => { setMode('register'); setAuthError(''); setAuthSuccess(''); }} data-testid="switch-to-register" aria-label="Switch to Register" title="Switch to Register">
                    Register
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== LOGGED IN: Show Token + CRUD ===== */}
      {isLoggedIn && (
        <>
          {/* Header bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <span className="help-text" data-testid="logged-in-user">
              Logged in as <strong>{userEmail}</strong>
            </span>
            <button className="btn btn-sm btn-outline" onClick={handleLogout} data-testid="logout-btn" aria-label="Logout" title="Logout">
              Logout
            </button>
          </div>

          {/* JWT Token Display */}
          <div className="card" data-testid="token-card" style={{ borderLeft: '3px solid var(--success)', marginBottom: 20 }}>
            <h3 className="card__title">🔑 Your JWT Token</h3>
            <div style={codeStyle} data-testid="token-display">
              {token}
            </div>
            <p className="help-text mt-16">This token is used automatically in all article CRUD requests via <strong>Authorization: Bearer {'<token>'}</strong></p>
          </div>

          {/* Feedback messages */}
          {articleError && (
            <div style={{ padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 6, marginBottom: 12 }} data-testid="article-error" role="alert">
              {articleError}
            </div>
          )}
          {articleSuccess && (
            <div style={{ padding: 12, background: '#e8f5e9', color: '#2e7d32', borderRadius: 6, marginBottom: 12 }} data-testid="article-success" role="status">
              {articleSuccess}
            </div>
          )}

          <div className="grid-2">
            {/* Create / Edit Article Form */}
            <div className="card" data-testid="article-form-card">
              <h3 className="card__title" data-testid="form-title">
                {editingId ? '✏️ Edit Article' : '➕ Create Article'}
              </h3>
              <form onSubmit={handleArticleSubmit} data-testid="article-form">
                <div className="form-group">
                  <label htmlFor="article-title">Title</label>
                  <input id="article-title" className="form-control" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} placeholder="Article title" required data-testid="article-title-input" aria-label="Article Title" title="Article Title" />
                </div>
                <div className="form-group">
                  <label htmlFor="article-desc">Description</label>
                  <input id="article-desc" className="form-control" value={articleDesc} onChange={e => setArticleDesc(e.target.value)} placeholder="Short description" data-testid="article-desc-input" aria-label="Article Description" title="Article Description" />
                </div>
                <div className="form-group">
                  <label htmlFor="article-content">Content</label>
                  <textarea id="article-content" className="form-control" value={articleContent} onChange={e => setArticleContent(e.target.value)} placeholder="Full article content" rows={4} required data-testid="article-content-input" aria-label="Article Content" title="Article Content" />
                </div>
                <div className="form-group">
                  <label htmlFor="article-tags">Tags (comma-separated)</label>
                  <input id="article-tags" className="form-control" value={articleTags} onChange={e => setArticleTags(e.target.value)} placeholder="playwright, testing, automation" data-testid="article-tags-input" aria-label="Article Tags" title="Article Tags" />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-primary'}`} disabled={loading} data-testid={editingId ? 'update-article-btn' : 'create-article-btn'} aria-label={editingId ? 'Update Article' : 'Create Article'} title={editingId ? 'Update Article' : 'Create Article'}>
                    {editingId ? 'Update Article' : 'Create Article'}
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-outline" onClick={clearArticleForm} data-testid="cancel-edit-btn" aria-label="Cancel Edit" title="Cancel Edit">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Articles List */}
            <div className="card" data-testid="articles-list-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 className="card__title" style={{ margin: 0 }} data-testid="articles-list-title">
                  📄 Your Articles ({articles.length})
                </h3>
                <button className="btn btn-sm btn-outline" onClick={() => fetchArticles()} data-testid="refresh-articles-btn" aria-label="Refresh Articles" title="Refresh Articles">
                  🔄 Refresh
                </button>
              </div>

              {articles.length === 0 && (
                <p className="help-text" data-testid="no-articles">
                  No articles yet. Create your first article using the form.
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {articles.map((article, index) => (
                  <div
                    key={article.id}
                    data-testid={`article-card-${article.id}`}
                    data-test={`article-card-${index}`}
                    style={{
                      padding: 14,
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      background: editingId === article.id ? '#fff3e0' : '#fafafa',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1rem' }} data-testid={`article-title-${article.id}`}>
                          {article.title}
                        </h4>
                        {article.description && (
                          <p style={{ margin: '4px 0', color: '#666', fontSize: '0.85rem' }} data-testid={`article-desc-${article.id}`}>
                            {article.description}
                          </p>
                        )}
                        <p style={{ margin: '4px 0', fontSize: '0.85rem' }} data-testid={`article-content-${article.id}`}>
                          {article.content.length > 120 ? article.content.substring(0, 120) + '...' : article.content}
                        </p>
                        {article.tags.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }} data-testid={`article-tags-${article.id}`}>
                            {article.tags.map(tag => (
                              <span key={tag} className="tag tag-primary" style={{ fontSize: '0.7rem' }}>{tag}</span>
                            ))}
                          </div>
                        )}
                        <p style={{ margin: '6px 0 0', fontSize: '0.75rem', color: '#999' }} data-testid={`article-date-${article.id}`}>
                          Created: {new Date(article.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button className="btn btn-sm btn-outline" onClick={() => handleEdit(article)} data-testid={`edit-article-${article.id}`} aria-label={`Edit article ${article.title}`} title="Edit Article">
                          ✏️ Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(article.id)} data-testid={`delete-article-${article.id}`} aria-label={`Delete article ${article.title}`} title="Delete Article">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* API Response display (always visible) */}
      {response && (
        <div className="card mt-16" data-testid="api-response-card" style={{ borderLeft: `3px solid ${response.status < 300 ? 'var(--success)' : response.status < 500 ? 'var(--warning)' : 'var(--error)'}` }}>
          <h3 className="card__title">
            API Response
            <span className={`tag ${response.status < 300 ? 'tag-success' : response.status < 500 ? 'tag-warning' : 'tag-error'}`} style={{ marginLeft: 12 }} data-testid="response-status">
              {response.status || 'Error'}
            </span>
            <span className="tag tag-primary" style={{ marginLeft: 8 }} data-testid="response-time">
              {response.time}ms
            </span>
          </h3>
          <div style={codeStyle} data-testid="api-response-body">
            {JSON.stringify(response.data, null, 2)}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-12 mt-16" data-testid="api-loading">
          <div className="spinner" style={{ width: 24, height: 24, borderWidth: 3 }}></div>
          <span>Sending request...</span>
        </div>
      )}
    </div>
  );
}

