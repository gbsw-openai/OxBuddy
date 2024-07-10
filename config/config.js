    import dotenv from 'dotenv';

    dotenv.config();

    const config = {
    apiKey: process.env.OPENAI_API_KEY,
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
    };

    export default config;
