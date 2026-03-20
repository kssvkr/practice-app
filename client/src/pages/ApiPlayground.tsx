import { useState } from 'react';

const API_BASE = 'http://localhost:5000/api';

interface ApiResponse {
  status: number;
  data: unknown;
  time: number;
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
  const [token, setToken] = useState('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'tryit' | 'examples'>('tryit');

  // Register form
  const [regName, setRegName] = useState('John Doe');
  const [regEmail, setRegEmail] = useState('john@test.com');
  const [regPassword, setRegPassword] = useState('password123');

  // Login form
  const [loginEmail, setLoginEmail] = useState('john@test.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Article form
  const [articleTitle, setArticleTitle] = useState('Automation Testing');
  const [articleDesc, setArticleDesc] = useState('Playwright automation');
  const [articleContent, setArticleContent] = useState('Full article content');
  const [articleId, setArticleId] = useState('1');

  const makeRequest = async (method: string, url: string, body?: unknown, auth?: boolean) => {
    setLoading(true);
    const start = performance.now();
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (auth && token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE}${url}`, {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      const data = await res.json();
      const time = Math.round(performance.now() - start);

      if (data.token) setToken(data.token);

      setResponse({ status: res.status, data, time });
    } catch {
      setResponse({ status: 0, data: { error: 'Network error. Is the server running on port 5000?' }, time: Math.round(performance.now() - start) });
    }
    setLoading(false);
  };

  return (
    <div data-testid="api-playground-page">
      <h1 className="page-title" data-testid="page-title">API Testing Playground</h1>
      <p className="page-subtitle" data-testid="page-subtitle">
        Practice API authentication, JWT token handling, and authorized requests using Playwright or Selenium.
        No UI login required — authentication is API-only.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20 }}>
        <button
          className={`btn ${activeTab === 'tryit' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderRadius: '8px 0 0 8px' }}
          onClick={() => setActiveTab('tryit')}
          data-testid="tab-tryit"
          aria-label="Try It tab"
          title="Try It"
        >
          🧪 Try It
        </button>
        <button
          className={`btn ${activeTab === 'examples' ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderRadius: '0 8px 8px 0' }}
          onClick={() => setActiveTab('examples')}
          data-testid="tab-examples"
          aria-label="Code Examples tab"
          title="Code Examples"
        >
          📖 Code Examples
        </button>
      </div>

      {/* Token Display */}
      {token && (
        <div className="card" data-testid="token-card" style={{ borderLeft: '3px solid var(--success)' }}>
          <h3 className="card__title">🔑 Current JWT Token</h3>
          <div style={codeStyle} data-testid="token-display">
            {token}
          </div>
          <p className="help-text mt-16">Use this token in the Authorization header: <strong>Bearer {'<token>'}</strong></p>
          <button className="btn btn-sm btn-danger mt-16" onClick={() => setToken('')} data-testid="clear-token-btn" title="Clear Token" aria-label="Clear Token">Clear Token</button>
        </div>
      )}

      {/* ===== TRY IT TAB ===== */}
      {activeTab === 'tryit' && (
        <>
          <div className="grid-2">
            {/* Register */}
            <div className="card" data-testid="register-card">
              <h3 className="card__title"><span className="api-method-badge post">POST</span> /api/auth/register</h3>
              <p className="help-text mb-16">Register a new user. Returns a success message.</p>
              <div className="form-group">
                <label htmlFor="reg-name" data-testid="reg-name-label">Name</label>
                <input id="reg-name" className="form-control" value={regName} onChange={e => setRegName(e.target.value)} data-testid="reg-name-input" data-test="reg-name-input" aria-label="Name" title="Name" placeholder="Enter name" />
              </div>
              <div className="form-group">
                <label htmlFor="reg-email" data-testid="reg-email-label">Email</label>
                <input id="reg-email" className="form-control" value={regEmail} onChange={e => setRegEmail(e.target.value)} data-testid="reg-email-input" data-test="reg-email-input" aria-label="Email" title="Email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="reg-password" data-testid="reg-password-label">Password</label>
                <input id="reg-password" type="password" className="form-control" value={regPassword} onChange={e => setRegPassword(e.target.value)} data-testid="reg-password-input" data-test="reg-password-input" aria-label="Password" title="Password" placeholder="Enter password" />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => makeRequest('POST', '/auth/register', { name: regName, email: regEmail, password: regPassword })}
                disabled={loading}
                data-testid="register-btn"
                data-test="register-btn"
                title="Register"
                aria-label="Register"
              >
                Register
              </button>
              <details className="mt-16" data-testid="register-example">
                <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#666' }}>Example Request / Response</summary>
                <div style={codeStyle}>
{`// Request
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123"
}

// Response (201)
{
  "message": "User registered successfully"
}`}
                </div>
              </details>
            </div>

            {/* Login */}
            <div className="card" data-testid="login-card">
              <h3 className="card__title"><span className="api-method-badge post">POST</span> /api/auth/login</h3>
              <p className="help-text mb-16">Login to get a JWT token for protected APIs.</p>
              <div className="form-group">
                <label htmlFor="login-email" data-testid="login-email-label">Email</label>
                <input id="login-email" className="form-control" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} data-testid="login-email-input" data-test="login-email-input" aria-label="Login Email" title="Login Email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="login-password" data-testid="login-password-label">Password</label>
                <input id="login-password" type="password" className="form-control" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} data-testid="login-password-input" data-test="login-password-input" aria-label="Login Password" title="Login Password" placeholder="Enter password" />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => makeRequest('POST', '/auth/login', { email: loginEmail, password: loginPassword })}
                disabled={loading}
                data-testid="login-btn"
                data-test="login-btn"
                title="Login"
                aria-label="Login"
              >
                Login
              </button>
              <details className="mt-16" data-testid="login-example">
                <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#666' }}>Example Request / Response</summary>
                <div style={codeStyle}>
{`// Request
POST /api/auth/login
{
  "email": "john@test.com",
  "password": "password123"
}

// Response (200)
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "1", "email": "john@test.com" }
}`}
                </div>
              </details>
            </div>

            {/* Create Article */}
            <div className="card" data-testid="create-article-card">
              <h3 className="card__title"><span className="api-method-badge post">POST</span> /api/articles <span className="tag tag-warning" style={{ marginLeft: 8, fontSize: '0.7rem' }}>🔒 Auth</span></h3>
              <p className="help-text mb-16">Create an article. Requires JWT token.</p>
              <div className="form-group">
                <label htmlFor="article-title" data-testid="article-title-label">Title</label>
                <input id="article-title" className="form-control" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} data-testid="article-title-input" data-test="article-title-input" aria-label="Article Title" title="Article Title" placeholder="Article title" />
              </div>
              <div className="form-group">
                <label htmlFor="article-desc" data-testid="article-desc-label">Description</label>
                <input id="article-desc" className="form-control" value={articleDesc} onChange={e => setArticleDesc(e.target.value)} data-testid="article-desc-input" data-test="article-desc-input" aria-label="Article Description" title="Article Description" placeholder="Short description" />
              </div>
              <div className="form-group">
                <label htmlFor="article-content" data-testid="article-content-label">Content</label>
                <textarea id="article-content" className="form-control" value={articleContent} onChange={e => setArticleContent(e.target.value)} data-testid="article-content-input" data-test="article-content-input" aria-label="Article Content" title="Article Content" placeholder="Article content" rows={3} />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => makeRequest('POST', '/articles', { title: articleTitle, description: articleDesc, content: articleContent }, true)}
                disabled={loading}
                data-testid="create-article-btn"
                data-test="create-article-btn"
                title="Create Article"
                aria-label="Create Article"
              >
                Create Article
              </button>
              {!token && <p className="help-text mt-16" style={{ color: 'var(--error)' }}>⚠️ Login first to get a token</p>}
              <details className="mt-16" data-testid="create-article-example">
                <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#666' }}>Example Request / Response</summary>
                <div style={codeStyle}>
{`// Request
POST /api/articles
Authorization: Bearer <JWT_TOKEN>
{
  "title": "Automation Testing",
  "description": "Playwright automation",
  "content": "Full article content"
}

// Response (201)
{
  "id": "4",
  "title": "Automation Testing",
  "description": "Playwright automation",
  "content": "Full article content",
  "author": "1",
  "tags": [],
  "createdAt": "2026-03-19T...",
  "updatedAt": "2026-03-19T..."
}`}
                </div>
              </details>
            </div>

            {/* Update Article */}
            <div className="card" data-testid="update-article-card">
              <h3 className="card__title"><span className="api-method-badge put">PUT</span> /api/articles/:id <span className="tag tag-warning" style={{ marginLeft: 8, fontSize: '0.7rem' }}>🔒 Auth</span></h3>
              <p className="help-text mb-16">Update an existing article by ID.</p>
              <div className="form-group">
                <label htmlFor="update-article-id" data-testid="update-article-id-label">Article ID</label>
                <input id="update-article-id" className="form-control" value={articleId} onChange={e => setArticleId(e.target.value)} data-testid="update-article-id-input" data-test="update-article-id-input" aria-label="Article ID for Update" title="Article ID" placeholder="Article ID" />
              </div>
              <button
                className="btn btn-warning"
                onClick={() => makeRequest('PUT', `/articles/${encodeURIComponent(articleId)}`, { title: articleTitle + ' (Updated)', description: articleDesc, content: articleContent }, true)}
                disabled={loading}
                data-testid="update-article-btn"
                data-test="update-article-btn"
                title="Update Article"
                aria-label="Update Article"
              >
                Update Article
              </button>
              {!token && <p className="help-text mt-16" style={{ color: 'var(--error)' }}>⚠️ Login first to get a token</p>}
              <details className="mt-16" data-testid="update-article-example">
                <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#666' }}>Example Request / Response</summary>
                <div style={codeStyle}>
{`// Request
PUT /api/articles/1
Authorization: Bearer <JWT_TOKEN>
{
  "title": "Updated Title",
  "description": "Updated description",
  "content": "Updated content"
}

// Response (200)
{
  "id": "1",
  "title": "Updated Title",
  "description": "Updated description",
  ...
}`}
                </div>
              </details>
            </div>

            {/* Delete Article */}
            <div className="card" data-testid="delete-article-card">
              <h3 className="card__title"><span className="api-method-badge delete">DELETE</span> /api/articles/:id <span className="tag tag-warning" style={{ marginLeft: 8, fontSize: '0.7rem' }}>🔒 Auth</span></h3>
              <p className="help-text mb-16">Delete an article by ID.</p>
              <div className="form-group">
                <label htmlFor="delete-article-id" data-testid="delete-article-id-label">Article ID</label>
                <input id="delete-article-id" className="form-control" value={articleId} onChange={e => setArticleId(e.target.value)} data-testid="delete-article-id-input" data-test="delete-article-id-input" aria-label="Article ID for Delete" title="Article ID" placeholder="Article ID" />
              </div>
              <button
                className="btn btn-danger"
                onClick={() => makeRequest('DELETE', `/articles/${encodeURIComponent(articleId)}`, undefined, true)}
                disabled={loading}
                data-testid="delete-article-btn"
                data-test="delete-article-btn"
                title="Delete Article"
                aria-label="Delete Article"
              >
                Delete Article
              </button>
              {!token && <p className="help-text mt-16" style={{ color: 'var(--error)' }}>⚠️ Login first to get a token</p>}
              <details className="mt-16" data-testid="delete-article-example">
                <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#666' }}>Example Request / Response</summary>
                <div style={codeStyle}>
{`// Request
DELETE /api/articles/1
Authorization: Bearer <JWT_TOKEN>

// Response (200)
{
  "message": "Article deleted",
  "article": { ... }
}

// Without token (401)
{
  "error": "Access denied. No token provided."
}`}
                </div>
              </details>
            </div>

            {/* Get Articles (JWT Protected) */}
            <div className="card" data-testid="get-articles-card">
              <h3 className="card__title"><span className="api-method-badge get">GET</span> /api/articles <span className="tag tag-warning" style={{ marginLeft: 8, fontSize: '0.7rem' }}>🔒 Auth</span></h3>
              <p className="help-text mb-16">Fetch all articles for the logged-in user. Requires JWT token.</p>
              <button
                className="btn btn-success"
                onClick={() => makeRequest('GET', '/articles', undefined, true)}
                disabled={loading}
                data-testid="get-articles-btn"
                data-test="get-articles-btn"
                title="Get All Articles"
                aria-label="Get All Articles"
              >
                Get All Articles
              </button>
              {!token && <p className="help-text mt-16" style={{ color: 'var(--error)' }}>⚠️ Login first to get a token</p>}
              <details className="mt-16" data-testid="get-articles-example">
                <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#666' }}>Example Response</summary>
                <div style={codeStyle}>
{`// GET /api/articles
// Authorization: Bearer <JWT_TOKEN>
// Response (200) — returns only your articles
[
  {
    "id": "4",
    "title": "Getting Started with Playwright",
    "description": "A guide to modern...",
    "content": "Playwright is a modern...",
    "createdBy": "1",
    "tags": ["playwright", "testing"],
    "createdAt": "...",
    "updatedAt": "..."
  },
  ...
]`}
                </div>
              </details>
            </div>

            {/* Health Check */}
            <div className="card" data-testid="health-check-card">
              <h3 className="card__title"><span className="api-method-badge get">GET</span> /api/health</h3>
              <p className="help-text mb-16">Check if the API server is running.</p>
              <button
                className="btn btn-outline"
                onClick={() => makeRequest('GET', '/health')}
                disabled={loading}
                data-testid="health-check-btn"
                data-test="health-check-btn"
                title="Health Check"
                aria-label="Health Check"
              >
                Health Check
              </button>
            </div>
          </div>
        </>
      )}

      {/* ===== CODE EXAMPLES TAB ===== */}
      {activeTab === 'examples' && (
        <div>
          {/* Playwright API Testing */}
          <div className="card" data-testid="playwright-examples-card">
            <h3 className="card__title">🎭 Playwright API Testing Examples</h3>
            <p className="help-text mb-16">Copy these examples to practice Playwright API testing with this application.</p>

            <h4 style={{ margin: '16px 0 8px' }}>1. Register a User</h4>
            <div style={codeStyle} data-testid="pw-register-example">
{`const response = await request.post('/api/auth/register', {
  data: {
    name: 'John Doe',
    email: 'john@test.com',
    password: 'password123'
  }
})
const body = await response.json()
expect(body.message).toBe('User registered successfully')`}
            </div>

            <h4 style={{ margin: '16px 0 8px' }}>2. Login and Extract JWT Token</h4>
            <div style={codeStyle} data-testid="pw-login-example">
{`const response = await request.post('/api/auth/login', {
  data: {
    email: 'john@test.com',
    password: 'password123'
  }
})
const { token, user } = await response.json()
expect(token).toBeTruthy()
expect(user.id).toBeTruthy()
expect(user.email).toBe('john@test.com')`}
            </div>

            <h4 style={{ margin: '16px 0 8px' }}>3. Create Article with Token</h4>
            <div style={codeStyle} data-testid="pw-create-example">
{`await request.post('/api/articles', {
  headers: {
    Authorization: \`Bearer \${token}\`
  },
  data: {
    title: 'Playwright Testing',
    description: 'Automation article',
    content: 'Full article content'
  }
})`}
            </div>

            <h4 style={{ margin: '16px 0 8px' }}>4. Update Article with Token</h4>
            <div style={codeStyle} data-testid="pw-update-example">
{`await request.put('/api/articles/1', {
  headers: {
    Authorization: \`Bearer \${token}\`
  },
  data: {
    title: 'Updated Title',
    description: 'Updated description'
  }
})`}
            </div>

            <h4 style={{ margin: '16px 0 8px' }}>5. Delete Article with Token</h4>
            <div style={codeStyle} data-testid="pw-delete-example">
{`await request.delete('/api/articles/1', {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
})`}
            </div>

            <h4 style={{ margin: '16px 0 8px' }}>6. Get Articles (JWT Protected)</h4>
            <div style={codeStyle} data-testid="pw-get-example">
{`const response = await request.get('/api/articles', {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
})
const articles = await response.json()
expect(response.status()).toBe(200)`}
            </div>

            <h4 style={{ margin: '16px 0 8px' }}>7. Unauthorized Access Testing</h4>
            <div style={codeStyle} data-testid="pw-unauth-example">
{`// Without token — should get 401
const response = await request.post('/api/articles', {
  data: {
    title: 'Should Fail',
    content: 'No token provided'
  }
})
expect(response.status()).toBe(401)
const body = await response.json()
expect(body.error).toBe('Access denied. No token provided.')`}
            </div>
          </div>

          {/* Full Scenario */}
          <div className="card" data-testid="full-scenario-card">
            <h3 className="card__title">🔄 Full End-to-End API Scenario</h3>
            <p className="help-text mb-16">Complete workflow: Register → Login → Create → Update → Delete → Verify</p>
            <div style={codeStyle} data-testid="full-scenario-example">
{`import { test, expect } from '@playwright/test'

test('Full API authentication flow', async ({ request }) => {
  const baseURL = 'http://localhost:5000'

  // Step 1: Register
  const regRes = await request.post(\`\${baseURL}/api/auth/register\`, {
    data: { name: 'Tester', email: 'tester@test.com', password: 'pass123' }
  })
  expect(regRes.status()).toBe(201)

  // Step 2: Login
  const loginRes = await request.post(\`\${baseURL}/api/auth/login\`, {
    data: { email: 'tester@test.com', password: 'pass123' }
  })
  const { token } = await loginRes.json()
  expect(token).toBeTruthy()
  // Step 3: Create Article (with auth)
  const createRes = await request.post(\`\${baseURL}/api/articles\`, {
    headers: { Authorization: \`Bearer \${token}\` },
    data: {
      title: 'Test Article',
      description: 'Created by Playwright',
      content: 'Article body'
    }
  })
  expect(createRes.status()).toBe(201)
  const article = await createRes.json()

  // Step 4: Update Article
  const updateRes = await request.put(
    \`\${baseURL}/api/articles/\${article.id}\`,
    {
      headers: { Authorization: \`Bearer \${token}\` },
      data: { title: 'Updated Article' }
    }
  )
  expect(updateRes.status()).toBe(200)

  // Step 5: Delete Article
  const deleteRes = await request.delete(
    \`\${baseURL}/api/articles/\${article.id}\`,
    { headers: { Authorization: \`Bearer \${token}\` } }
  )
  expect(deleteRes.status()).toBe(200)

  // Step 6: Verify GET articles requires auth
  const listRes = await request.get(\`\${baseURL}/api/articles\`, {
    headers: { Authorization: \`Bearer \${token}\` }
  })
  expect(listRes.status()).toBe(200)
})`}
            </div>
          </div>

          {/* Practice Scenarios */}
          <div className="card" data-testid="practice-scenarios-card">
            <h3 className="card__title">📋 Automation Practice Scenarios</h3>
            <div style={{ padding: '8px 0' }}>
              <table className="data-table" role="table" aria-label="Practice scenarios" data-testid="scenarios-table">
                <thead>
                  <tr><th>#</th><th>Scenario</th><th>Method</th><th>Auth Required</th></tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>Register user via API</td><td><span className="api-method-badge post">POST</span></td><td>No</td></tr>
                  <tr><td>2</td><td>Login via API</td><td><span className="api-method-badge post">POST</span></td><td>No</td></tr>
                  <tr><td>3</td><td>Extract JWT token from response</td><td>—</td><td>—</td></tr>
                  <tr><td>4</td><td>Pass token in Authorization header</td><td>—</td><td>—</td></tr>
                  <tr><td>5</td><td>Create article with token</td><td><span className="api-method-badge post">POST</span></td><td>Yes (Bearer)</td></tr>
                  <tr><td>6</td><td>Update article with token</td><td><span className="api-method-badge put">PUT</span></td><td>Yes (Bearer)</td></tr>
                  <tr><td>7</td><td>Delete article with token</td><td><span className="api-method-badge delete">DELETE</span></td><td>Yes (Bearer)</td></tr>
                  <tr><td>8</td><td>Get articles list (with token)</td><td><span className="api-method-badge get">GET</span></td><td>Yes (Bearer)</td></tr>
                  <tr><td>9</td><td>Unauthorized access testing (no token)</td><td>Any protected</td><td>Expect 401</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Response Display (visible on both tabs) */}
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
