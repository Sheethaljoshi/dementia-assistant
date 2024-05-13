from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str

app = FastAPI()

@app.post("/get_answer/", response_model=AnswerResponse)
async def get_answer(question_request: QuestionRequest):
    question = question_request.question
    final_answer = return_answer(question)
    return {"answer": final_answer}

def return_answer(question):
    # Your OpenAI Assistant logic here
    client = OpenAI()
    assistant = client.beta.assistants.create(
        name="Personal Helper",
        instructions="The person asking questions is Sheethal Joshi",
        model="gpt-4-turbo",
        tools=[{"type": "file_search"}],
    )

    assistant = client.beta.assistants.update(
        assistant_id=assistant.id,
        tool_resources={"file_search": {"vector_store_ids": ['vs_l7uuSAnirZgPKhfnSriaOoTu']}},
    )

    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": "Answer the following questions from the data files provided, keeping in mind that the user is Sheethal Joshi. She talks in first person. "
            },
            {
                "role": "user",
                "content": question,
            }
        ]
    )

    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=assistant.id,
        instructions= question,
    )

    if run.status == 'completed':
        messages = client.beta.threads.messages.list(
            thread_id=thread.id,
            run_id=run.id
        )
        answer = messages.data[0].content[0].text.value
        return answer
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
