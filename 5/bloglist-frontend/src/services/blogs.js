import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

export default { getAll }
