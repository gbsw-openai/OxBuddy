    import { analyzeChat, calculateProbability } from '../services/probabilityService.js';

    export const getProbability = async (req, res) => {
    const { message } = req.body;
    try {
        const analysis = await analyzeChat(message);
        const probability = calculateProbability(analysis);
        res.json({ probability, analysis });
    } catch (error) {
        res.status(500).json({ error: 'Failed to analyze chat' });
    }
    };
