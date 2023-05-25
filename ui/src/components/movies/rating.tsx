import React, { useContext } from 'react'
import Button from '../inputs/button'
import useNotify from '../notification/use-notify'
import useRating from './use-rating'
import { UserContext } from '../user/user.context'
import { Row } from '../../styled/flex'
import useMovies from './use-movies'
import { useNavigate } from 'react-router-dom'

type Props = {
    movieId: number
}


const Rating = ({ movieId }: Props) => {

    const [user, _] = useContext(UserContext)
    const navigate = useNavigate()

    const { movies, setMovies } = useMovies()

    const points = [1, 2, 3, 4, 5]
    const rating = useRating()

    const notify = useNotify()

    const updateRating = (points: number) => {
        const movieIndex = movies.findIndex(({ id }) => id === movieId)
        if (movieIndex === -1 ) return
        const updatedMovies = [...movies.slice(0, movieIndex), { ...movies[movieIndex], ratings: [...movies[movieIndex].ratings, points] }, ...movies.slice(movieIndex + 1, undefined)]
        setMovies(updatedMovies)
    }

    const handleRating = async (points: number) => {
        if (!user.loggedIn) {
            notify('Please log in to rate movies', 'error')
            return
        }
        try {
            const { error } = await rating(points, user.username, movieId)
            if (error) {
                notify(error, 'error')
                return
            }
            
            updateRating(points)
            notify('Rating successful', 'success')
        } catch (e) {
            notify('An unexpected error occurred', 'error'); console.log(e);
        }
    }

    return <Row>
    {
        points.map(point => <Button key={point} onClick={async () => await handleRating(point)} label={`${point}`} />)
    }
    </Row>
}

export default Rating