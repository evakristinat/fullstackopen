import axios from 'axios'
const baseUrl = '/api/login'

export const login = async (userInfo) => {
  try {
    const response = await axios.post(baseUrl, userInfo)
    return response.data
  } catch (exception) {
    console.log(exception)
  }
}
export default { login }
