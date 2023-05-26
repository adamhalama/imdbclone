import { instance } from "../../axios.config"
import useEnsureAuth from "./use-ensure-auth"

const useToplist = () => {
    const ensureAuth = useEnsureAuth()
    return async (email: string, movieId: number) => {
    const { data } = await instance({
        url: '/user/toplist',
        method: 'PUT',
        headers: { 'ensure-auth': ensureAuth },
        data: {
            email,
            movieId
        }
        })
    return data
    }
}

export default useToplist