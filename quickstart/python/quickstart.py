import requests
import glob
from pprint import pprint
import os
import time

API_URL = os.getenv('API_URL')
assert API_URL
API_KEY = os.getenv('API_KEY')
assert API_KEY

headers = {
    "x-api-key": API_KEY
}

# Create an index
INDEXES_URL = f"{API_URL}/indexes"
INDEX_NAME = "<YOUR_INDEX_NAME>" # Use a descriptive name for your index 
data = {
    "engine_id": "marengo",
    "index_options": ["visual", "conversation", "text_in_video"],
    "index_name": INDEX_NAME,
}
response = requests.post(INDEXES_URL, headers=headers, json=data)
INDEX_ID = response.json().get('_id')
print (f'Status code: {response.status_code}')
pprint (response.json())

# Upload a video
INDEX_TASK_URL = f"{API_URL}/indexes/tasks"
file_name = "<YOUR_FILE_NAME>" # Example: "test.mp4"
file_path = "<YOUR_FILE_PATH>" # Example: "/Downloads/test.mp4"
file_stream = open(file_path,'rb')
data = {
    "index_id": INDEX_ID, 
    "language": "en"
}
file_param=[('video_file', (file_name, file_stream, 'application/octet-stream'))]
response = requests.post(INDEX_TASK_URL, headers=headers, data=data, files=file_param)
TASK_ID = response.json().get('_id')
pprint (response.status_code)
pprint (response.json())

# Monitor the indexing process
INDEX_TASK_STATUS_URL = f"{API_URL}/indexes/tasks/{TASK_ID}"
while True:
    response = requests.get(INDEX_TASK_STATUS_URL, headers=headers)
    STATUS = response.json().get('status')
    if STATUS == 'ready':
        pprint (response.status_code)
        pprint (response.json())
        break
    time.sleep(10)

# Make a search request
SEARCH_URL = f"{API_URL}/search"
data = {
    "query": "car accidents",
    "index_id": INDEX_ID,
    "search_options": ["visual"],
}
response = requests.post(SEARCH_URL, headers=headers, json=data)
pprint (response.status_code)
pprint (response.json())