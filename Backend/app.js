import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import db from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

db();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/profile', profileRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../frontend/build')));

  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
  );
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});