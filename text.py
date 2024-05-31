from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from openai import OpenAI
from dotenv import load_dotenv
import json
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware
from pymongo.server_api import ServerApi

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],  # Set to ["*"] to allow requests from any origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

cluster = MongoClient("mongodb+srv://sh33thal24:sh33thal24@cluster0.wfa7cip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",  server_api=ServerApi('1') )
db = cluster["dementia"]
collection = db["fileids"]

def export_and_upload_to_vector_store():
    
    def export_to_json():
        data = list(collection.find())
        for item in data:
            item['_id'] = str(item['_id'])
        json_bytes = json.dumps(data).encode('utf-8')
        return BytesIO(json_bytes)

    
    def create_file(file_contents):
        client = OpenAI()
        file3 = client.files.create(
            file=("data.json", file_contents, "application/json"),
            purpose="assistants"
        )
        return file3

    
    def create_and_upload_vector_store_file(file_id):
        client = OpenAI()
        vector_store_files = client.beta.vector_stores.files.list(vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu')
        for vector_store_file in vector_store_files:
            deleted = client.beta.vector_stores.files.delete(
                vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu',
                file_id=vector_store_file.id
            )
            print("deleted",deleted.id)
        vector_store_file = client.beta.vector_stores.files.create(
            vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu',
            file_id=file_id
        )
        
        vector_store_files = client.beta.vector_stores.files.list(
        vector_store_id="vs_l7uuSAnirZgPKhfnSriaOoTu"
)
        print(vector_store_files)
        
        return vector_store_file

    json_file_contents = export_to_json()
    created_file = create_file(json_file_contents)
    vector_store_file = create_and_upload_vector_store_file(created_file.id)
    return vector_store_file


@app.post("/insert/place")
async def insert_place(email: str, first_name: str, last_name: str, place_name: str, place_description: str):
    new_place = {
        "place_name": place_name,
        "description": place_description,
    }
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$push": {"places_mem": new_place}}
    )
    export_and_upload_to_vector_store()
    return {"message": "Place data inserted successfully"}

@app.post("/insert/memory")
async def insert_mem(email: str, first_name: str, last_name: str, date: str, mem_description: str):
    new_memory = {
        "date": date,
        "description": mem_description
    }
    
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$push": {"mem_data": new_memory}}
    )
    
    export_and_upload_to_vector_store()
    return {"message": "Place data inserted successfully"}

@app.post("/delete/person")
async def delete_person(email: str, first_name: str, last_name: str, person_index: int):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"people_data": 1, "_id": 0}
    )
    if query_result:
        person_data = query_result.get("people_data", [])
        if person_index < len(person_data):
            person_to_delete = person_data[person_index]
            collection.update_one(
                {"email": email, "first_name": first_name, "last_name": last_name},
                {"$pull": {"people_data": person_to_delete}}
            )
            export_and_upload_to_vector_store()
            return {"message": "Person data deleted successfully"}
    raise HTTPException(status_code=404, detail="Person not found")

@app.delete("/delete/place")
async def delete_place(email: str, first_name: str, last_name: str, place_index: int):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"places_mem": 1, "_id": 0}
    )
    if query_result:
        place_data = query_result.get("places_mem", [])
        if place_index < len(place_data):
            place_to_delete = place_data[place_index]
            collection.update_one(
                {"email": email, "first_name": first_name, "last_name": last_name},
                {"$pull": {"places_mem": place_to_delete}}
            )
            export_and_upload_to_vector_store()
            return {"message": "Place data deleted successfully"}
    raise HTTPException(status_code=404, detail="Place not found")

@app.delete("/delete/mem")
async def delete_mem_data(email: str, first_name: str, last_name: str, mem_index: int):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"mem_data": 1, "_id": 0}
    )
    if query_result:
        mem_data = query_result.get("mem_data", [])
        if mem_index < len(mem_data):
            mem_to_delete = mem_data[mem_index]
            collection.update_one(
                {"email": email, "first_name": first_name, "last_name": last_name},
                {"$pull": {"mem_data": mem_to_delete}}
            )
            export_and_upload_to_vector_store()
            return {"message": "Memory data deleted successfully"}
    raise HTTPException(status_code=404, detail="Memory data not found")

@app.get("/get/mem")
async def get_mem(email: str, first_name: str, last_name: str):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"mem_data": 1, "_id": 0}
    )
    export_and_upload_to_vector_store()
    if query_result:
        return query_result.get("mem_data", [])
    else:
        return []

@app.get("/get/person")
async def get_person(email: str, first_name: str, last_name: str):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"people_data": 1, "_id": 0}
    )
    export_and_upload_to_vector_store()
    if query_result:
        return query_result.get("people_data", [])
    else:
        return []

@app.get("/get/place")
async def get_place(email: str, first_name: str, last_name: str):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"places_mem": 1, "_id": 0}
    )
    export_and_upload_to_vector_store()
    if query_result:
        return query_result.get("places_mem", [])
    else:
        return []
    
@app.post("/insert/person")
async def insert_person(email: str, first_name: str, last_name: str, name: str, relation: str, occupation: str, description: str):
    new_person = {
        "name": name,
        "relation": relation,
        "occupation": occupation,
        "description": description
    }
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$push": {"people_data": new_person}}
    )
    export_and_upload_to_vector_store()
    return {"message": "Person data inserted successfully"}

@app.post("/update/person")
async def update_person(email: str, first_name: str, last_name: str, person_index: int, name: str, relation: str, occupation: str, description: str):
    query_result = collection.find_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"people_data": 1, "_id": 0}
    )
    
    if query_result:
        people_data = query_result.get("people_data", [])
        if person_index < len(people_data):
            people_data[person_index] = {
                "name": name,
                "relation": relation,
                "occupation": occupation,
                "description": description
            }
            collection.update_one(
                {"email": email, "first_name": first_name, "last_name": last_name},
                {"$set": {"people_data": people_data}}
            )
            export_and_upload_to_vector_store()
            return {"message": "Person data updated successfully"}
    raise HTTPException(status_code=404, detail="Person not found")

    

@app.post("/get_answer/")
async def get_answer(question: str):
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
    uvicorn.run(app, host="127.0.0.1", port=8000)
