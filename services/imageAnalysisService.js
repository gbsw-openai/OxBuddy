import OpenAI from 'openai';
import config from '../config/config.js';

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

const userProfile = {
    personalityMatch: 0.8, // 성격 매칭 (0.0 ~ 1.0)
    interestMatch: 0.6,    // 관심사 매칭 (0.0 ~ 1.0)
    appearanceScore: 0.7,  // 외모 평가 (0.0 ~ 1.0)
    conversationQuality: 0.9 // 대화의 질 (0.0 ~ 1.0)
};

export const calculateProbability = (analysis) => {
    // 연애 확률 계산 로직
    return Math.random();
};
