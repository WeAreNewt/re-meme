import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ImageSlice {
  selectedImage: string | null
}

const initialState : ImageSlice = {
  selectedImage: null
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
    removeImage: (state) => {
      state.selectedImage = null
    },
  },
  extraReducers: {
    'HYDRATE': (state, action) => {
        return {...state, ...action.payload }
    }
    }
})

export const { setImage, removeImage } = imageSlice.actions

export default imageSlice.reducer