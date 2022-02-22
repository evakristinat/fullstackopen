import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: 'Please vote for your favourite anecdote or create a new one',
  visible: false,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    voted(state, action) {
      const anecdote = action.payload
      return (state = { text: `You voted for '${anecdote}'`, visible: true })
    },
    created(state, action) {
      return (state = {
        text: `You created '${action.payload}'`,
        visible: true,
      })
    },
    hide(state) {
      return (state = { ...initialState, visible: false })
    },
  },
})

export const { voted, created, hide } = notificationSlice.actions
export default notificationSlice.reducer
