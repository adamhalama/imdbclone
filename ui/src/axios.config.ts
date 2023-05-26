import axios from 'axios'
import logger from './components/dev/logger'

export const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVICE_URL,
    headers: { 'Authorization': process.env.REACT_APP_AUTH_API_KEY },
    validateStatus: (status) => status !== 500
})

instance.interceptors.request.use(request => {
    logger(`Starting request: ${JSON.stringify(request, null, 2)}`)
    return request
})

instance.interceptors.response.use(response => {
    logger(`Response: ${JSON.stringify(response, null, 2)}`)
    return response
})