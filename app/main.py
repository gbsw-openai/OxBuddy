from fastapi import FastAPI, HTTPException, Request
import openai
from dotenv import load_dotenv
import os
from pydantic import BaseModel, Field
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

# 환경 변수가 제대로 로드되었는지 확인
api_key = os.getenv("OPENAI_API_KEY")

# print(f"Loaded API Key: {api_key}")

# 직접 API 키 설정 (필요한 경우)
# openai.api_key = "sk-************************"

openai.api_key = api_key

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # React 개발 서버 주소
    # 다른 허용할 origin을 필요에 따라 추가
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    relationship_status: str
    response_time: str
    contact_frequency: str
    contact_duration: str
    contact_interval: int
    question: str
    # follow_up_question: str = None
    


analyze_data = {}

@app.post("/analyze")
async def analyze(request: Request):
    try:
        global analyze_data
        analyze_data = await request.json()
        print("Data received:", analyze_data)  
        return {"message": "데이터 성공적으로 수신. /analyze_result에서 결과를 확인할 수 있습니다."}
    # except ValueError:
    #     raise HTTPException(status_code=400, detail="Invalid JSON format")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/analyze_result")
async def analyze_result():
    try:
        global analyze_data
        print("Fetching result for data:", analyze_data) 
        if not analyze_data:
            raise HTTPException(status_code=400, detail="No data found. Please submit your data to /analyze first.")

        messages = [
            {
                "role": "system",
                "content": """
                You are the most knowledgeable relationship expert in the world, and you will be inundated with various questions about relationships. Your task is to provide the best answers to these questions. You exist to provide customized solutions for all relationship problems that many people experience, and your goal is to help the person asking the question maintain a happier and healthier relationship with their loved one. People will ask you various questions for relationship advice, and you must provide the best answers to solve their relationship problems.
                
                The person asking the question will upload a photo of the conversation, and you need to analyze it to show the other person's interest level as a percentage and recommend appropriate solutions. This analysis should thoroughly examine the behaviors, conversation content, and subtle signals of the person communicating with the questioner. You should capture emotional changes in the messages, analyze the words and expressions used to understand the hidden intentions.
                
                Additionally, a window will appear where the user can input the contact frequency, response time, the last time they were contacted, and the tone of the messages. Based on this, you need to analyze whether the other person likes the questioner. For example, you should consider if the other person contacts frequently, responds quickly, when the last contact was made, and if the tone used in the conversation is friendly.
                
                Based on this information, as a relationship expert, you must accurately read the other person's mind and provide the best relationship solutions to the questioner. For example, if the other person shows interest, you might recommend the timing for a confession, or if the other person is keeping a distance, you could suggest ways to improve the relationship. Your goal is to provide specific and practical advice tailored to the situation, helping the questioner to have a healthier and happier relationship. As a relationship expert, you play an important role in understanding people's complex emotions and relationships and helping them achieve what they desire.
                무조건 % 수치를 가장 맨앞에 말하고  쉼표로 구분한 뒤에 솔루션이나 조언등을 말해줘
                전체 문장을 최대 4줄로 해줘"""
            },
            {
                "role": "user",
                "content": f"""
                Relationship status: {analyze_data['relationship_status']}
                Response time: {analyze_data['response_time']}
                Contact frequency: {analyze_data['contact_frequency']}
                Contact duration: {analyze_data['contact_duration']}
                Contact interval: {analyze_data['contact_interval']} minutes
                Question: {analyze_data['question']}
                """
            }
        ]

        if analyze_data.get('follow_up_question'):
            messages.append({
                "role": "user",
                "content": analyze_data['follow_up_question']
            })

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150
        )

        print(response)

        return JSONResponse(content={"response": response['choices'][0]['message']['content']});
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
