import React from 'react'
import useMovies from './use-movies'
import styled from '@emotion/styled'

import { Column } from '../../styled/flex'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Movies = () => {
    const { movies, loading } = useMovies()

    const [searchParams, _] = useSearchParams()

    const filter = searchParams.get('nameFilter') ?? ''
    
    const navigate = useNavigate()

    const filteredMovies = movies.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))

    return <Container>
        { loading ? <span>Loading</span> : 
        <MovieContainer>
            {
            filteredMovies.map(({ id, name }) => <div key={id} onClick={() => navigate(`/movie/${id}`)}>{name}</div>)
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