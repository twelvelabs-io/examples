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
  const INDEX_NAME = '<YOUR_INDEX_NAME>' // Replace this with the name of your index. Example: testing

  const INDEXES_URL = `${API_URL}/indexes`
  const headers = {
    'x-api-key': API_KEY,
  }

  let data = JSON.stringify({
    "engine_id": "marengo",
    "index_options": [
      "visual",
      "conversation",
      "text_in_video"
    ],
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

  const INDEX_TASK_URL = `${API_URL}/indexes/tasks`
  
  const file_param = fs.createReadStream('<FILE_PATH>') // Replace this with the path of the file you want to upload. Example: /Downloads/test.mp4 
  let formData = new FormData()
  formData.append('file', file_param)
  formData.append('INDEX_ID', INDEX_ID)
  formData.append('language', 'en')
    
  config = {
    method: 'post',
    url: INDEX_TASK_URL,
    headers: headers,
    data : formData
  };
  resp = await axios(config)
  response = await resp.data
  TASK_ID = response._id
  console.log(resp.status)
  console.log(response)
  
  const INDEX_TASK_STATUS_URL = `${API_URL}/indexes/tasks/${TASK_ID}`
  config = {
    method: 'get',
    url: INDEX_TASK_STATUS_URL,
    headers: headers,
  }

  resp = await axios(config)
  response = await resp.data
  console.log(response)
  const STATUS = response.status
  console.log(STATUS)
  

  const SEARCH_URL = `${API_URL}/search`
  data = JSON.stringify(
    {
    "query": "car accident",
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
  console.log(response)

})()
