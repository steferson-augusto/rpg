import axios from 'axios'
require('dotenv').config()

export const baseURL = 'http://127.0.0.1:3333'

const api = axios.create({ baseURL })
api.defaults.headers.Authorization = `Bearer ${process.env.API_TOKEN}`

export default api
