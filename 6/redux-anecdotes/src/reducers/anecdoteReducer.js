import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

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
      return [...state, anecdote]
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { addVote, create, setAnecdotes } = anecdoteSlice.actions

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
