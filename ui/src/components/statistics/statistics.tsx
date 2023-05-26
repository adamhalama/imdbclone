import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Column } from '../../styled/flex'
import Input from '../inputs/input'
import useMovies from '../movies/use-movies'
import { getAvg } from '../../util/math.util'
import { DateTime } from 'luxon'
import getValue from '../inputs/getValue'

const Statistics = () => {
    const { movies } = useMovies()
    const [actor, setActor] = useState("")
    const [decade, setDecade] = useState(2020)
    const moviesByActor = movies.filter(({ actors }) => actors.map(actor => actor.toLowerCase()).includes(actor.toLowerCase()))
    const moviesByDecade = movies.filter(({ year }) => year >= decade && year <= (decade + 10))

    const getDecades = (startYear: number, previousResult: number[] = []): number[] => {
        if ((startYear % 10) !== 0) return getDecades(startYear - 1)
        const result = [...previousResult, startYear]
        if (startYear > DateTime.now().year) return result
        return getDecades(startYear + 10, result)
    }

    return <Container>
        <Statistic>
            Average rating of all movies that an actor has played in <br />
            <Input value={actor} onChange={(actor) => setActor(actor)} label='Input actor' />
            Result: {moviesByActor.length === 0 ? 'No ratings yet' : getAvg(moviesByActor.flatMap(({ ratings }) => ratings))}
        </Statistic>
        <Statistic>
            Average rating of all movies in a specific decade <br /><br />
            Choose decade
            <select value={decade} onChange={(decade) => setDecade(parseInt(getValue(decade)))}> 
                {getDecades(1950).map(decade => <option key={decade} value={decade}>{decade}</option>)}
            </select>
            Result: {moviesByDecade.length === 0 ? 'No ratings yet' : getAvg(moviesByDecade.flatMap(({ ratings }) => ratings))}
        </Statistic>
    </Container>
}

const Statistic = styled(Column)`
border: 1px solid grey;
padding: 30px;
gap: 20px;
`

const Container = styled(Column)`
    padding: 40px;
    gap: 40px;
    overflow-y: scroll;
`

export default Statistics