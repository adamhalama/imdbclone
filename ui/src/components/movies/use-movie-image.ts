import axios from "axios"
import useNotify from "../notification/use-notify"


const useMovieImage =  () => {
    const notify = useNotify()
    return async (id: number) => {
        try {
            const key = process.env.REACT_APP_TMDB_API_KEY
            const url = `https://api.themoviedb.org/3/movie/tt00${id}/images?api_key=${key}`
            const response = await axios({
                url,
                method: 'GET',
                headers: { 
                    'accept': 'application/json',
                    'Authorization': `Bearer ${key}`
                }
            })
            return `http://image.tmdb.org/t/p/original/${response.data.posters[0].file_path}`
        } catch {
            // notify("The movie image went missing.", 'error')
        }
    }

}

export default useMovieImage