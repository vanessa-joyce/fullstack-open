import axios from "axios";
const baseUrl = '/api/login'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => token

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  setToken(response.data.token)
  return response.data
}

export default { login, getToken, setToken }