from openai import OpenAI
from typing_extensions import override
from openai import AssistantEventHandler
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI()
  
assistant = client.beta.assistants.create(
  name="Financial Analyst Assistant",
  instructions="You are an expert financial analyst. Use you knowledge base to answer questions about audited financial statements.",
  model="gpt-4-turbo",
  tools=[{"type": "file_search"}],
)


assistant = client.beta.assistants.update(
  assistant_id=assistant.id,
  tool_resources={"file_search": {"vector_store_ids": ['vs_l7uuSAnirZgPKhfnSriaOoTu']}},
)

def get_user_question():
 
    question = input("Please enter your question: ")
    return question


thread = client.beta.threads.create(
  messages=[
    {
      "role": "user",
      "content": get_user_question(),
    }
  ]
)
 

client = OpenAI()
 
class EventHandler(AssistantEventHandler):
    @override
    def on_text_created(self, text) -> None:
        print(f"\nassistant > ", end="", flush=True)

    @override
    def on_message_done(self, message) -> None:
        # print a citation to the file searched
        message_content = message.content[0].text
        annotations = message_content.annotations
        citations = []
        for index, annotation in enumerate(annotations):
            message_content.value = message_content.value.replace(
                annotation.text, f"[{index}]"
            )
            if file_citation := getattr(annotation, "file_citation", None):
                cited_file = client.files.retrieve(file_citation.file_id)
                citations.append(f"[{index}] {cited_file.filename}")

        print(message_content.value)
        print("\n".join(citations))




with client.beta.threads.runs.stream(
    thread_id=thread.id,
    assistant_id=assistant.id,
    instructions="Address the user as My dear",
    event_handler=EventHandler(),
) as stream:
    stream.until_done()