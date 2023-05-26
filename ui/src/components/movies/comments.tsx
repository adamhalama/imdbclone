import React, { useContext, useState } from 'react'
import useMovies from './use-movies'
import { UserContext } from '../user/user.context'
import useNotify from '../notification/use-notify'
import { DateTime } from 'luxon'
import useComment from './use-comment'
import { Comment as CommentType } from '../../types'
import styled from '@emotion/styled'
import { Column } from '../../styled/flex'
import Comment from './comment'
import Input from '../inputs/input'
import getValue from '../inputs/getValue'
import Button from '../inputs/button'
import logger from '../dev/logger'

type Props = {
    movieId: number
    comments: CommentType[]
}

const Comments = ({ movieId, comments }: Props) => {
    const { movies, setMovies } = useMovies()
    const [user] = useContext(UserContext)
    const notify = useNotify()

    const [comment, setComment] = useState("")

    const sendComment = useComment()

    const updateComments = (text: string, username: string, date: string) => {
        const movieIndex = movies.findIndex(({ id }) => id === movieId)
        if (movieIndex === -1 ) return
        const updatedMovies = [...movies.slice(0, movieIndex), { ...movies[movieIndex], comments: [...movies[movieIndex].comments, { text, username, date }] }, ...movies.slice(movieIndex + 1, undefined)]
        setMovies(updatedMovies)
    }

    const handleComment = async () => {
        const now = DateTime.now().toISO() ?? ''
        if (!user.loggedIn) {
            notify('Please log in to comment', 'error')
            return
        }
        const { username } = user
        const text = comment
        try {
            const { error } = await sendComment(text, username, now, movieId)
            if (error) {
                notify(error, 'error')
                return
            }
            
        updateComments(text, username, now)
        notify('Comment successful', 'success')
        } catch (e) {
            logger(e);
            notify('An unexpected error occurred', 'error');
        }
    }
    return <Container>
        { user.loggedIn &&
        <Column>
            <h4>Comment</h4>
            <CommentArea value={comment} onChange={(comment) => setComment(getValue(comment))} /> 
            <Button label='Send' onClick={handleComment} />
        </Column>
        }
         
        { comments.map((comment, index) => <Comment key={index} comment={comment} />) }
    </Container>
}

const Container = styled(Column)`
width: 500px;
min-height: 300px;
height: fit-content;
margin: 40px;
gap: 30px;
`

const CommentArea = styled.textarea`
padding: 20px;
color: white;
min-height: 200px;
height: fit-content;
width: 400px;
background-color: black;
`

export default Comments