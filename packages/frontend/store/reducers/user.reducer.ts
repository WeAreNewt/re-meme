import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User/user.model'

export interface UserSlice {
  selectedUser: User | null
}

const initialState : UserSlice = {
  selectedUser: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserSlice, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    removeUser: (state: UserSlice) => {
      state.selectedUser = null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer