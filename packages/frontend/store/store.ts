import userReducer from './reducers/user.reducer';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, createTransform, persistReducer } from "redux-persist";
import { combineReducers } from "redux"
import storage from 'redux-persist/lib/storage';

/* export const transformCircular = createTransform(
  (inboundState, key) => JSON.stringify(inboundState),
  (outboundState, key) => JSON.parse(outboundState),
) */

export const persistConfig = {
  key: 'remixer',
  storage: storage,
  //blacklist: ['extras'],
  //transforms: [transformCircular],
};

const rootReducer = combineReducers({ user: userReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk/* , logger */]
});

export const persistor = persistStore(store);

