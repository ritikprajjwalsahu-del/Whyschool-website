import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import inquiryRoutes from './routes/inquiryRoutes';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(
  cors({
    origin: [
      FRONTEND_URL,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://whyschool.co',
      'https://www.whyschool.co',
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'WhySchool Backend API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 WhySchool Backend API running on port ${PORT}`);
});
