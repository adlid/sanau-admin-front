import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { redirectAndNotification } from "./redirectAndNotification.state"
import { NotistackType } from "../../../ts/types/notistack.types"

const redirectAndNotificationSlice = createSlice({
  name: 'notification',
  initialState: redirectAndNotification,
  reducers: {
    pushRedirect: (state, action: PayloadAction<any>) => {
      state.redirectTo = action.payload
    },
    addNotistack: (state, action: PayloadAction<NotistackType>) => {
      state.notistack = [...state.notistack, action.payload]
    },

    removeNotistack: (state, action: PayloadAction<number>) => {
      state.notistack = state.notistack.filter((notifier, index) => {
        return index !== action.payload
      })
    }

  },

})

export const { pushRedirect, addNotistack, removeNotistack } = redirectAndNotificationSlice.actions

export const redirectAndNotificationReducers = redirectAndNotificationSlice.reducer

