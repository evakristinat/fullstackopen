import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
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

export const { vote, create, setAnecdotes } = anecdoteSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    await anecdoteService.updateVotes(id)
    dispatch(vote(id))
  }
}

export default anecdoteSlice.reducer
