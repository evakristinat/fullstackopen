import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { voted, hide } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  /* Äänestäminen onnistuu vasta kun edellinen ilmoitus on poistunut, eli 5s edellisen toiminnon jälkeen.
  Tämä estää ilmoituksien sekoittumisen ja spämmäyksen.*/
  const vote = (id, content) => {
    if (!notification.visible) {
      dispatch(addVote(id))
      dispatch(voted(content))
    }
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
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
