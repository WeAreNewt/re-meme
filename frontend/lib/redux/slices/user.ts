import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User/user.model";

export interface UserState {
    selectedProfile: User | null
}

const initialState: UserState = {
    selectedProfile: null
}

export const selectedUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedProfile: (state, action: PayloadAction<User>) => {
            state.selectedProfile = action.payload
        },
        removeSelectedProfile: (state) => {
            state.selectedProfile = null
        }
    },
    extraReducers: {
        'HYDRATE': (state, action) => {
            return {...state, ...action.payload }
        }
    }
})

export const { setSelectedProfile, removeSelectedProfile } = selectedUserSlice.actions

export default selectedUserSlice.reducer
