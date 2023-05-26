import React, { useContext, useEffect, useState } from 'react'
import { Movie as MovieType } from '../../types'
import styled from '@emotion/styled'
import { Column, Row } from '../../styled/flex'
import useMovieImage from './use-movie-image'
import useNotify from '../notification/use-notify'
import placeholder from "./placeholder.jpg"
import MovieDetail from './movie-detail'
import { getAvg } from '../../util/math.util'
import Rating from './rating'
import Comments from './comments'
import Button from '../inputs/button'
import { UserContext } from '../user/user.context'
import useToplist from '../user/use-toplist'
import logger from '../../logging/logger'

type Props = {
    initialMovie: MovieType
}

const Movie = ({ initialMovie }: Props) => {

    const { id, name, description, director, ratings, actors, genre, comments } = initialMovie

    const [user, setUser] = useContext(UserContext)

    const [image, setImage] = useState(placeholder)

    const getImage = useMovieImage()

    const notify = useNotify()

    useEffect(() => {
        getImage(id).then(image => image ? setImage(image) : {})
    })

    const hasInToplist = () => !user.loggedIn ? false : user.toplist.some(({ id: toplistedId }) => toplistedId === id)

    const toggleToplist = useToplist()

    const updateToplist = () =>{ 
        if (!user.loggedIn) return
        const { toplist } = user
        const movieIndex = user.toplist.findIndex(({ id: toplistedId }) => toplistedId === id)
        if (movieIndex === -1) {
            setUser({ ...user, toplist: [...toplist, initialMovie] })
            return
        } 
        setUser({ ...user, toplist: [...toplist.slice(0, movieIndex), ...toplist.slice(movieIndex + 1, undefined)] })
    }

    const handleToplist = async () => {
        if (!user.loggedIn) return
        try {
            const { error } = await toggleToplist(user.email, id)
            if (error) {
                notify(error, 'error')
                return
            }
            updateToplist()
            notify('Operation successful')
        } catch (e) {
            logger(e)
            notify('An unexpected error occurred', 'error')
        }
    }

    const getToplistButton = () => {
        if (!user.loggedIn) return <></>
        if (hasInToplist()) {
            return <Button label='Remove from toplist' onClick={handleToplist} />
        }
        return <Button label='Add to toplist' onClick={handleToplist} />
    }

    return <Container>
        <h1>{name}</h1> 
        <Details>
            <Image src={image.toString()}/>
            <DetailsColumn>
                <MovieDetail title='' detail={description} />
                <MovieDetail title='Director' detail={director} />
                <MovieDetail title='Genre' detail={genre} />
                <MovieDetail title='Actors' detail={actors.join(", ")} />
                <MovieDetail title='Average rating (out of 5)' detail={ratings.length > 0 ? getAvg(ratings).toString() : "No ratings yet"} />
                <Rating movieId={id} />
                {getToplistButton()}
            </DetailsColumn>
        </Details>
        <Comments movieId={id} comments={comments} />
    </Container>
}

const Details = styled(Row)`
gap: 20px;
`

const DetailsColumn = styled(Column)`
gap: 20px;
`

const Image = styled.img`
width: 70vh;
height: fit-content;
`

const Container = styled(Column)`
    padding: 40px;
    height: 70vh;
    overflow-y: scroll;
    width: 100%;
`

export default Movie