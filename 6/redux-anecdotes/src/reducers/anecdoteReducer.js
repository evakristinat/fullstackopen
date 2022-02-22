import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find((a) => a.id === id)
      const updatedAnectode = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id === id ? updatedAnectode : anecdote
      )
    },
    create(state, action) {
      const anecdote = action.payload
      const anecdoteObj = asObject(anecdote)
      return [...state, anecdoteObj]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addVote, create, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
