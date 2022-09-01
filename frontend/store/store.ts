import userReducer, { UserSlice } from './reducers/user.reducer';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux"
import storage from 'redux-persist/lib/storage';
import authReducer, { AuthSlice } from './reducers/auth.reducer';

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

export interface RootState {
  user: UserSlice,
  auth: AuthSlice
}

const rootReducer = combineReducers({ user: userReducer, auth: authReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk/* , logger */]
});

export const persistor = persistStore(store);

