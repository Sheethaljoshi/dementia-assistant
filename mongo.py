
from pymongo import MongoClient
import json
from openai import OpenAI
from dotenv import load_dotenv



load_dotenv()

cluster = MongoClient("mongodb+srv://sh33thal24:sh33thal24@cluster0.wfa7cip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = cluster["dementia"]
collection = db["fileids"]

def insert_person_data(email, first_name, last_name, name, relation, occupation, description):
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


def insert_place_data(email, first_name, last_name, place_name, description, image):
    new_place = {
        "place_name": place_name,
        "description": description,
        "image": image
    }
    
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$push": {"places_mem": new_place}}
    )


def insert_mem_data(email, first_name, last_name, date, description):
    new_memory = {
        "date": date,
        "description": description
    }
    
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$push": {"mem_data": new_memory}}
    )

#insert_place_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas","CUSAT SOE", "This is where I study for college. Btech CSE is my course.", "img_url")

def export_to_json(filename):
    data = list(collection.find())

    for item in data:
        item['_id'] = str(item['_id'])
    with open(filename, "w") as json_file:
        json.dump(data, json_file, indent=4)  


def create_file(filename):
    client = OpenAI()
    file3 = client.files.create(
        file=open(filename, "rb"),
        purpose="assistants"
    )
    return file3


def create_vector_store_file(file_id):
    client = OpenAI()
    vector_store_files = client.beta.vector_stores.files.list(vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu')
    for vector_store_file in vector_store_files:
        client.beta.vector_stores.files.delete(
            vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu',
            file_id=vector_store_file.id
        )
    vector_store_file = client.beta.vector_stores.files.create(
        vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu',
        file_id=file_id
    )
    return vector_store_file

json_filename = "data.json"
export_to_json(json_filename)


created_file = create_file(json_filename)
#print("File created:", created_file)


vector_store_file = create_vector_store_file(created_file.id)
print("Vector store file created:", vector_store_file)

client = OpenAI()






vector_store_files = client.beta.vector_stores.files.list(
  vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu'
)
print(vector_store_files)

#insert_person_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas", "Joshi Thomas", "Father", "Business", "is hardworking and loves cars. likes dark pine green. is very extroverted.")


