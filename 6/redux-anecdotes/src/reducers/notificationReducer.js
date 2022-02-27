import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  visible: false,
  timeoutID: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) {
      const text = action.payload
      return (state = {
        ...state,
        text: text,
        visible: true,
      })
    },
    hide(state) {
      return (state = { ...initialState })
    },
    setTimeoutID(state, action) {
      const id = action.payload
      return (state = { ...state, timeoutID: id })
    },
  },
})

export const { notify, hide, setTimeoutID } = notificationSlice.actions

export const setNotification = (text, time = 3) => {
  return (dispatch, getState) => {
    const state = getState()
    const timeoutID = state.notification.timeoutID
    /*timeoutID on truthy vain jos edellinen notifikaatio on vielä näkyvissä, eli
    poiston hoitava timeout ei ole vielä tehnyt tehtäväänsä. Jos näin on, sen
    timeoutin toiminta keskeytetään, jotta uuden notifikaation timeout toimii oikein*/
    if (timeoutID) {
      clearTimeout(state.notification.timeoutID)
    }
    dispatch(notify(text))

    const newTimeoutID = setTimeout(() => {
      dispatch(hide())
    }, time * 1000)

    dispatch(setTimeoutID(newTimeoutID))
  }
}

export default notificationSlice.reducer
