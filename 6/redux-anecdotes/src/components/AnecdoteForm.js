import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created "${content}"`, 3)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" maxLength={200} />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, {
  createAnecdote,
  setNotification,
})(AnecdoteForm)
