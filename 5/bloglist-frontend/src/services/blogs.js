import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

const addNew = async (newBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}

export default { getAll, addNew, setToken}
