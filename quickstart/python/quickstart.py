import requests
import glob
from pprint import pprint
import os

API_URL = os.getenv('API_URL')
assert API_URL

API_KEY = os.getenv('API_KEY')
assert API_KEY

INDEX_NAME = "testing"

INDEXES_URL = f"{API_URL}/indexes"

headers = {
    "x-api-key": API_KEY
}

data = {
    "engine_id": "marengo",
    "index_options": ["visual", "conversation", "text_in_video"],
    "index_name": INDEX_NAME,
}

response = requests.post(INDEXES_URL, headers=headers, json=data)
INDEX_ID = response.json().get('_id')
print (f'Status code: {response.status_code}')
pprint (response.json())


INDEX_TASK_URL = f"{API_URL}/indexes/tasks"

file_name = "<FILE_NAME>" #Replace this with the name of the file you want to upload. Example: test.mp4
file_path = "<FILE_PATH>" #Replace this with the path of the file you want to upload. Example: /Downloads/test.mp4 
file_stream = open(file_path,'rb')
file_param=[
    ('file', (file_name, file_stream, 'application/octet-stream')),
]

data = {
    "index_id": INDEX_ID, 
    "language": "en"
}

response = requests.post(INDEX_TASK_URL, headers=headers, data=data, files=file_param)
pprint (response.status_code)
pprint (response.json())
TASK_ID = response.json().get('_id')
print(f'ID: {TASK_ID}')
TASK_ID = response.json().get('_id')

INDEX_TASK_STATUS_URL = f"{API_URL}/indexes/tasks/{TASK_ID}"
response = requests.get(INDEX_TASK_STATUS_URL, headers=headers)
pprint (response.status_code)
pprint (response.json())
STATUS = response.json().get('status')


data = {
    "query": "car accident",
    "index_id": INDEX_ID,
    "search_options": ["conversation"],
}
SEARCH_URL = f"{API_URL}/search"
response = requests.post(SEARCH_URL, headers=headers, json=data)
pprint (response.status_code)
pprint (response.json())
