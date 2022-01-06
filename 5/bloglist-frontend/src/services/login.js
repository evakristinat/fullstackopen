import axios from 'axios'
const baseUrl = '/api/login'

export const login = async (userInfo) => {
  const response = await axios.post(baseUrl, userInfo)
  return response.data
}
export default { login }
