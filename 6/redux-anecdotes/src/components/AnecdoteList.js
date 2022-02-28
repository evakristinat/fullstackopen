import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import notificationReducer, { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const style = {
    maxWidth: 500,
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  }

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted for "${content}"`, 3))
  }

  /*Filteröinti ja sorttaaminen liittyvät vain esitykseen, niillä ei ole vaikutusta storen dataan.*/
  const filteredAnecdotes = filter
    ? [...anecdotes].filter((anecdote) => {
        const text = anecdote.content.toLowerCase()
        return text.indexOf(filter.toLowerCase()) !== -1
      })
    : anecdotes

  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes
  )

  return (
    <ul style={style}>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <div>
            <p>has {anecdote.votes} votes </p>
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </ul>
  )
}

export default AnecdoteList
