import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: loginService.getToken() },
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: loginService.getToken() },
  }

  const request = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: loginService.getToken() },
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(request, 'request')
  return request.data
}

export default { getAll, create, update, remove }