import { instance } from "../../axios.config"
import logger from "../../logging/logger"

const useLogin = (email: string, password: string) => {
    return async () => {
        const response = await instance({
            method: 'POST',
            url: '/user/login',
            data: {
                email,
                password
            }
        })
        logger(response)
        return response.data
    }
}

export default useLogin