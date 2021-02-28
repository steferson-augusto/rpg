import axios from 'axios'

export const baseURL = 'http://127.0.0.1:3333'

const api = axios.create({
  baseURL
})

export default api
