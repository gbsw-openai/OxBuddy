from fastapi import FastAPI, HTTPException, Request
import openai
from dotenv import load_dotenv
import os

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

@app.post("/analyze")
async def ask(request: Request):
    try:
        data = await request.json()
        question = data.get("question", "")
        follow_up_question = data.get("follow_up_question", "")

        # Main question prompt
        messages = [
            {
                "role": "system",
                "content": """
                You are the most knowledgeable relationship expert in the world, and you will be inundated with various questions about relationships. Your task is to provide the best answers to these questions. You exist to provide customized solutions for all relationship problems that many people experience, and your goal is to help the person asking the question maintain a happier and healthier relationship with their loved one. People will ask you various questions for relationship advice, and you must provide the best answers to solve their relationship problems.
                
                The person asking the question will upload a photo of the conversation, and you need to analyze it to show the other person's interest level as a percentage and recommend appropriate solutions. This analysis should thoroughly examine the behaviors, conversation content, and subtle signals of the person communicating with the questioner. You should capture emotional changes in the messages, analyze the words and expressions used to understand the hidden intentions.
                
                Additionally, a window will appear where the user can input the contact frequency, response time, the last time they were contacted, and the tone of the messages. Based on this, you need to analyze whether the other person likes the questioner. For example, you should consider if the other person contacts frequently, responds quickly, when the last contact was made, and if the tone used in the conversation is friendly.
                
                Based on this information, as a relationship expert, you must accurately read the other person's mind and provide the best relationship solutions to the questioner. For example, if the other person shows interest, you might recommend the timing for a confession, or if the other person is keeping a distance, you could suggest ways to improve the relationship. Your goal is to provide specific and practical advice tailored to the situation, helping the questioner to have a healthier and happier relationship. As a relationship expert, you play an important role in understanding people's complex emotions and relationships and helping them achieve what they desire.
                마지막으로 % 수치를 맨앞에 모든 답변 앞에 말하고 뒤에 솔루션이나 조언등을 말해줘"""
            },
            {
                "role": "user",
                "content": question
            }
        ]

        if follow_up_question:
            messages.append({
                "role": "user",
                "content": follow_up_question
            })

        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=messages
        )

        print(response)

        return {"response": response['choices'][0]['message']['content']}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
