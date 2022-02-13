import { createSlice } from '@reduxjs/toolkit'

const initialState =
  'Please vote for your favourite anecdote or create a new one'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    voted(state, action) {
      const anecdote = action.payload
      return (state = `You voted for '${anecdote}'`)
    },
  },
})

export const { voted } = notificationSlice.actions
export default notificationSlice.reducer
