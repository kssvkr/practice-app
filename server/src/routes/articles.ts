import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

interface InMemoryArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  createdBy: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const articles: InMemoryArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Playwright',
    description: 'A guide to modern end-to-end testing with Playwright',
    content: 'Playwright is a modern end-to-end testing framework...',
    createdBy: 'system',
    tags: ['playwright', 'testing', 'automation'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Selenium Best Practices',
    description: 'Best practices for Selenium WebDriver automation',
    content: 'Selenium WebDriver is one of the most popular tools...',
    createdBy: 'system',
    tags: ['selenium', 'testing', 'best-practices'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'API Testing with REST',
    description: 'Introduction to REST API testing for QA engineers',
    content: 'REST API testing is an integral part of software QA...',
    createdBy: 'system',
    tags: ['api', 'rest', 'testing'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
let articleIdCounter = 4;

// GET /api/articles - Protected (returns only articles for logged-in user)
router.get('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const userArticles = articles.filter(a => a.createdBy === req.userId);
  res.json(userArticles);
});

// GET /api/articles/:id - Protected
router.get('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const article = articles.find(a => a.id === req.params.id && a.createdBy === req.userId);
  if (!article) {
    return res.status(404).json({ error: 'Article not found.' });
  }
  res.json(article);
});

// POST /api/articles - Protected
router.post('/', authMiddleware, (req: AuthRequest, res: Response) => {
  const { title, description, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const article: InMemoryArticle = {
    id: String(articleIdCounter++),
    title,
    description: description || '',
    content,
    createdBy: req.userId || 'unknown',
    tags: tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  articles.push(article);
  res.status(201).json(article);
});

// PUT /api/articles/:id - Protected
router.put('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const index = articles.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Article not found.' });
  }

  const { title, description, content, tags } = req.body;
  articles[index] = {
    ...articles[index],
    ...(title && { title }),
    ...(description !== undefined && { description }),
    ...(content && { content }),
    ...(tags && { tags }),
    updatedAt: new Date().toISOString(),
  };

  res.json(articles[index]);
});

// DELETE /api/articles/:id - Protected
router.delete('/:id', authMiddleware, (req: AuthRequest, res: Response) => {
  const index = articles.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Article not found.' });
  }

  const deleted = articles.splice(index, 1);
  res.json({ message: 'Article deleted', article: deleted[0] });
});

export default router;
