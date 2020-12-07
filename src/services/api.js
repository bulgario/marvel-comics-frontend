import axios from 'axios'
import 'dotenv/config'
import { BASE_URL } from '../consts';

const api = axios.create({
  baseURL: BASE_URL,
})

let token =
  localStorage.getItem('data') !== null
    ? JSON.parse(localStorage.getItem('data')).token
    : null

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api