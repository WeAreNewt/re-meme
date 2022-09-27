import { combineReducers, configureStore } from '@reduxjs/toolkit'
import selectedUserReducer, { UserState } from './slices/user'
import storage from 'redux-persist/lib/storage'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import { createWrapper } from 'next-redux-wrapper'
import imageSliceReducer, { ImageSlice } from './slices/image'
import authSliceReducer, { AuthSlice } from './slices/auth'

const rootReducer = combineReducers({
    user: selectedUserReducer,
    image: imageSliceReducer,
    auth: authSliceReducer
})

export let store;

const makeStore = () => {
    if(typeof window === 'undefined') {
        store = configureStore({
            reducer: rootReducer
        })
        return store
    } else {
        const persistConfig = {
            key: 'root',
            storage,
            whitelist: ['user', 'auth']
        }

        const persistedReducer = persistReducer(persistConfig, rootReducer)
        store = configureStore({
            reducer: persistedReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
            }})
        })

        store.__persistor = persistStore(store)

        return store
    }
}

export interface RootState  {
    user: UserState,
    image: ImageSlice,
    auth: AuthSlice
}

export const wrapper = createWrapper(makeStore, { debug: true })