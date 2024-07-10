    import config from '../config/config.js';
    import OpenAI from 'openai';
    import fs from 'fs';

    const openai = new OpenAI({
    apiKey: config.apiKey,
    });

    export const analyzeImage = async (filePath) => {
    const response = await openai.images.create({
        image: fs.readFileSync(filePath),
        model: 'gpt-4-vision',  // 가상의 모델 이름
    });

    if (response.choices && response.choices.length > 0) {
        return response.choices[0].text;  // 이미지 분석 결과를 텍스트로 반환
    } else {
        throw new Error('No response received from the OpenAI API.');
    }
    };

    export const calculateProbability = (analysis) => {
    return Math.random();
    };
