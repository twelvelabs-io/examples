(async () => {
  const FormData = require('form-data')
  const axios = require('axios');
  const fs = require('fs')
  const API_URL = process.env.API_URL
  if (typeof API_URL === 'undefined') {
    console.log('API_URL is not defined.')
    process.exit(1)
  }
  const API_KEY = process.env.API_KEY
  if (typeof API_KEY === 'undefined') {
    console.log('API_KEY is not defined.')
    process.exit(1)
  }
  
  const headers = {
    'x-api-key': API_KEY,
  }

  // Create an index
  const INDEXES_URL = `${API_URL}/indexes`
  const INDEX_NAME = '<YOUR_INDEX_NAME>' // Use a descriptive name for your index 
  let data = JSON.stringify({
      "engine_id": "marengo",
      "index_options": ["visual", "conversation", "text_in_video"],
      "index_name": INDEX_NAME
  })
  let config = {
    method: 'post',
    url: INDEXES_URL,
    headers: headers,
    data : data
  }
  let resp = await axios(config)
  let response = await resp.data
  const INDEX_ID = response._id
  console.log(resp.status)
  console.log(response)

  //Upload a video
  const INDEX_TASK_URL = `${API_URL}/indexes/tasks`
  const file_path = '<YOUR_FILE_PATH>' // Example: "/Downloads/test.mp4"
  const file_stream = fs.createReadStream(file_path)
  let formData = new FormData()
  formData.append('INDEX_ID', INDEX_ID)
  formData.append('language', 'en')
  formData.append('video_file', file_stream)
  config = {
    method: 'post',
    url: INDEX_TASK_URL,
    headers: headers,
    data : formData,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };
  resp = await axios(config)
  response = await resp.data
  const TASK_ID = response._id
  console.log(resp.status)
  console.log(response)

  //Monitor the indexing process
  const INDEX_TASK_STATUS_URL = `${API_URL}/indexes/tasks/${TASK_ID}`
  config = {
    method: 'get',
    url: INDEX_TASK_STATUS_URL,
    headers: headers,
  }
  let STATUS
  do {
    resp = await axios(config)
    response = await resp.data
    STATUS = response.status
    if (STATUS !== 'ready')
      await new Promise(r => setTimeout(r, 10000));
  } while (STATUS !== 'ready')
  console.log(STATUS)
  console.log(response)

  //Make a search request
  const SEARCH_URL = `${API_URL}/search`
  data = JSON.stringify(
    {
    "query": "car accidents",
    "index_id": INDEX_ID,
    "search_options": ["visual"],
  })
  config = {
    method: 'post',
    url: SEARCH_URL,
    headers: headers,
    data: data
  }
  resp = await axios(config)
  response = await resp.data
  console.log(resp.status)
  console.log(response)
})()
