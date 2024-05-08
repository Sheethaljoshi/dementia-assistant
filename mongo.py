
from pymongo import MongoClient
import json
import io
from openai import OpenAI
from pathlib import Path
from dotenv import load_dotenv
from io import BytesIO



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
    
def update_person_data(email, first_name, last_name, person_index, update_fields):
    update_query = {"$set": {}}
    for field, value in update_fields.items():
        update_query["$set"]["people_data." + str(person_index) + "." + field] = value

    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        update_query
    )
    
def update_place_data(email, first_name, last_name, person_index, update_fields):
    update_query = {"$set": {}}
    for field, value in update_fields.items():
        update_query["$set"]["place_data." + str(person_index) + "." + field] = value

    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        update_query
    )
    
def update_mem_data(email, first_name, last_name, person_index, update_fields):
    update_query = {"$set": {}}
    for field, value in update_fields.items():
        update_query["$set"]["mem_data." + str(person_index) + "." + field] = value

    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        update_query
    )

def delete_person(email, first_name, last_name, person_index):
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$pull": {"people_data": {"$eq": collection.find_one({"email": email, "first_name": first_name, "last_name": last_name})['people_data'][person_index]}}}
    )
    
def delete_place(email, first_name, last_name, place_index):
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$pull": {"place_data": {"$eq": collection.find_one({"email": email, "first_name": first_name, "last_name": last_name})['place_data'][place_index]}}}
    )

def delete_memory(email, first_name, last_name, mem_index):
    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$pull": {"mem_data": {"$eq": collection.find_one({"email": email, "first_name": first_name, "last_name": last_name})['mem_data'][mem_index]}}}
    )



    collection.update_one(
        {"email": email, "first_name": first_name, "last_name": last_name},
        {"$unset": {"people_data." + str(person_index) + "." + field: ""}}
    )

'''
#insert_person_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas", "Joshi Thomas", "Broski", "Broing", "is hardworking and loves cars. likes dark pine green. is very extroverted.")
insert_mem_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas","19-10-2022", "This is when I started B-tech")
insert_mem_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas","24-01-2004", "This is my Birthday. I was born in Bahrain")
insert_mem_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas","05-04-2024", "Professor Vinod Kumar Kicked me out of class because i passed an attendance sheet during the exam. Thats why i dont like that professor.")
# Update person data
'''
'''
update_person_data("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas", 0, {
    "description": "Updated description",
    "relation": "Uncle",
    "occupation": "Engineer"
})
'''

# Delete a person
#delete_person("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas", 3)

# Delete specific field from a person's data
#delete_person_field("sh33thal24@gmail.com", "Sheethal", "Joshi Thomas", 0, "description")

def export_to_json():
    data = list(collection.find())

    for item in data:
        item['_id'] = str(item['_id'])
    
    json_bytes = json.dumps(data).encode('utf-8')
    return BytesIO(json_bytes)


def create_file(file_contents):
    client = OpenAI()
    file3 = client.files.create(
        file=(json_filename, file_contents, "application/json"),
        purpose="assistants"
    )
    return file3


def create_vector_store_file(file_id):
    client = OpenAI()
    vector_store_files = client.beta.vector_stores.files.list(vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu')
    for vector_store_file in vector_store_files:
        vector_store_file1 = client.beta.vector_stores.files.delete(
            vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu',
            file_id=vector_store_file.id
        )
        print(vector_store_file1)
    vector_store_file = client.beta.vector_stores.files.create(
        vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu',
        file_id=file_id
    )
    return vector_store_file

json_filename = "data.json"
json_file_contents = export_to_json()

created_file = create_file(json_file_contents)
#print("File created:", created_file)


vector_store_file = create_vector_store_file(created_file.id)
print("Vector store file created:", vector_store_file)

client = OpenAI()

vector_store_files = client.beta.vector_stores.files.list(
  vector_store_id='vs_l7uuSAnirZgPKhfnSriaOoTu'
)
print(vector_store_files)




