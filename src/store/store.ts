import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from "./rootReducer"

const middleware = getDefaultMiddleware({
    immutableCheck: true,
    serializableCheck: false,
    thunk: true,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
})


export type AppDispatch = typeof store.dispatch

type RootReducerType = typeof rootReducer; // (globalState: GLOBALSTATE)=> GLOBALSTATE
export type AppStateType = ReturnType<RootReducerType>;
