import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { created } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    const newAnecdote = event.target.newAnecdote.value
    event.preventDefault()
    dispatch(create(newAnecdote))
    dispatch(created(newAnecdote))
    event.target.newAnecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
