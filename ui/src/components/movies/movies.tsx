import React from 'react'
import useMovies from './use-movies'
import styled from '@emotion/styled'
import useMovieImage from './use-movie-image'
import { Column } from '../../styled/flex'
import { useNavigate } from 'react-router-dom'

const Movies = () => {
    const { movies, loading } = useMovies()
    
    const getImage = useMovieImage()
    const navigate = useNavigate()

    return <Container>
        { loading ? <span>Loading</span> : 
        <MovieContainer>
            {
            movies.map(({ id, name }) => <div key={id} onClick={() => navigate(`/movie/${id}`)}>{name}</div>)
            }
        </MovieContainer>
        }

    </Container>
}

const Container = styled.div`
padding: 40px;
height: 80%;
width: 100%;
`

const MovieContainer = styled(Column)`
    gap: 20px;
    overflow-y: scroll;
    font-size: 4em;
    height: 70vh;
    width: 100%
`

export default Movies