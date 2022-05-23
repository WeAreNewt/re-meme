import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User/user.model'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    selectedUser: {} as User
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    removeUser: (state) => {
      state.selectedUser = {} as User
    }
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer