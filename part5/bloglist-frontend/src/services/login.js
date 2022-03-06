import axios from 'axios'
const baseUrl = '/api/login'

export const login = ({ username, password }) => {
  const user = { username, password }
  const request = axios.post(baseUrl, user)
  return request.then(response => response.data)
}
