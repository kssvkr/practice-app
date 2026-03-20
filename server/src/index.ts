import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React client static files (client/dist is two levels up from server/dist)
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));

// Catch-all: serve index.html for any unmatched route (supports React client-side routing)
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
