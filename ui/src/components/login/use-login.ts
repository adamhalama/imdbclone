import { instance } from "../../axios.config"

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
        return response.data
    }
}

export default useLogin