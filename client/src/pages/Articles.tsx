import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = window.location.origin + '/api';

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

export default function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const token = localStorage.getItem('jwt_token');
  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); }
    catch { return {}; }
  })();

  const authHeaders = useCallback((): Record<string, string> => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }), [token]);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/articles`, { headers: authHeaders() });
      if (res.status === 401) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      const data = await res.json();
      setArticles(data);
    } catch {
      setError('Failed to fetch articles. Is the server running?');
    }
    setLoading(false);
  }, [authHeaders, navigate]);

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    fetchArticles();
  }, [token, navigate, fetchArticles]);

  const clearForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setContent('');
    setTags('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const body = {
      title,
      description,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (editingId) {
        const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(editingId)}`, {
          method: 'PUT',
          headers: authHeaders(),
          body: JSON.stringify(body),
        });
        if (!res.ok) { setError((await res.json()).error || 'Update failed'); return; }
        setSuccess('Article updated successfully!');
      } else {
        const res = await fetch(`${API_BASE}/articles`, {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify(body),
        });
        if (!res.ok) { setError((await res.json()).error || 'Create failed'); return; }
        setSuccess('Article created successfully!');
      }
      clearForm();
      fetchArticles();
    } catch {
      setError('Network error');
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setDescription(article.description);
    setContent(article.content);
    setTags(article.tags.join(', '));
    setSuccess('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${API_BASE}/articles/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) { setError((await res.json()).error || 'Delete failed'); return; }
      setSuccess('Article deleted successfully!');
      if (editingId === id) clearForm();
      fetchArticles();
    } catch {
      setError('Network error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div data-testid="articles-page">
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <h1 className="page-title" data-testid="articles-title" style={{ marginBottom: 4 }}>📝 My Articles</h1>
          <p className="page-subtitle" data-testid="articles-subtitle">
            Create, read, update and delete your articles. All APIs are JWT protected.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="help-text" data-testid="logged-in-user">
            Logged in as <strong>{user.email || 'Unknown'}</strong>
          </span>
          <button
            className="btn btn-sm btn-outline"
            onClick={handleLogout}
            data-testid="logout-button"
            data-test="logout-button"
            aria-label="Logout"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Feedback messages */}
      {error && (
        <div style={{ padding: 12, background: '#ffebee', color: '#c62828', borderRadius: 6, marginBottom: 12 }} data-testid="articles-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div style={{ padding: 12, background: '#e8f5e9', color: '#2e7d32', borderRadius: 6, marginBottom: 12 }} data-testid="articles-success" role="status">
          {success}
        </div>
      )}

      <div className="grid-2">
        {/* Create / Edit Form */}
        <div className="card" data-testid="article-form-card">
          <h3 className="card__title" data-testid="form-title">
            {editingId ? '✏️ Edit Article' : '➕ Create Article'}
          </h3>
          <form onSubmit={handleSubmit} data-testid="article-form">
            <div className="form-group">
              <label htmlFor="article-title" data-testid="article-title-label">Title</label>
              <input
                id="article-title"
                className="form-control"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Article title"
                required
                data-testid="article-title-input"
                data-test="article-title-input"
                aria-label="Article Title"
                title="Article Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="article-desc" data-testid="article-desc-label">Description</label>
              <input
                id="article-desc"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Short description"
                data-testid="article-desc-input"
                data-test="article-desc-input"
                aria-label="Article Description"
                title="Article Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="article-content" data-testid="article-content-label">Content</label>
              <textarea
                id="article-content"
                className="form-control"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Full article content"
                rows={4}
                required
                data-testid="article-content-input"
                data-test="article-content-input"
                aria-label="Article Content"
                title="Article Content"
              />
            </div>
            <div className="form-group">
              <label htmlFor="article-tags" data-testid="article-tags-label">Tags (comma-separated)</label>
              <input
                id="article-tags"
                className="form-control"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="playwright, testing, automation"
                data-testid="article-tags-input"
                data-test="article-tags-input"
                aria-label="Article Tags"
                title="Article Tags"
              />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="submit"
                className={`btn ${editingId ? 'btn-warning' : 'btn-primary'}`}
                data-testid={editingId ? 'update-article' : 'create-article'}
                data-test={editingId ? 'update-article' : 'create-article'}
                aria-label={editingId ? 'Update Article' : 'Create Article'}
                title={editingId ? 'Update Article' : 'Create Article'}
              >
                {editingId ? 'Update Article' : 'Create Article'}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={clearForm}
                  data-testid="cancel-edit"
                  data-test="cancel-edit"
                  aria-label="Cancel Edit"
                  title="Cancel Edit"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Articles List */}
        <div className="card" data-testid="articles-list-card">
          <h3 className="card__title" data-testid="articles-list-title">
            📄 Your Articles ({articles.length})
          </h3>

          {loading && (
            <div className="flex items-center gap-12" data-testid="articles-loading">
              <div className="spinner" style={{ width: 24, height: 24, borderWidth: 3 }}></div>
              <span>Loading articles...</span>
            </div>
          )}

          {!loading && articles.length === 0 && (
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
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEdit(article)}
                      data-testid={`edit-article-${article.id}`}
                      data-test={`edit-article-${article.id}`}
                      aria-label={`Edit article ${article.title}`}
                      title="Edit Article"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(article.id)}
                      data-testid={`delete-article-${article.id}`}
                      data-test={`delete-article-${article.id}`}
                      aria-label={`Delete article ${article.title}`}
                      title="Delete Article"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && articles.length > 0 && (
            <button
              className="btn btn-sm btn-outline mt-16"
              onClick={fetchArticles}
              data-testid="refresh-articles"
              data-test="refresh-articles"
              aria-label="Refresh Articles"
              title="Refresh Articles"
            >
              🔄 Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
