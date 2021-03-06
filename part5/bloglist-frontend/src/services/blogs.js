import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const remove = async ({ id }) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addLike = async ({ id }) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, { like: true }, config)
  return response.data
}

export const blogService = {
  addLike,
  create,
  getAll,
  remove,
  setToken,
}
