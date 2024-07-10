import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import fs from 'fs';
import config from './config/config.js';
import { analyzeImage } from './services/imageAnalysisService.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

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

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
