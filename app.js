import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import fs from 'fs';
import dotenv from 'dotenv';
import { analyzeImage, calculateProbability } from './services/imageAnalysisService.js';

dotenv.config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const analysis = await analyzeImage(req.file.path);
        const probability = calculateProbability(analysis);
        res.json({ probability, analysis });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze image' });
    } finally {
        fs.unlinkSync(req.file.path);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
