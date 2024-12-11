import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  console.log(loginService.getToken())
  const config = {
    headers: { Authorization: loginService.getToken() },
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

export default { getAll, create }