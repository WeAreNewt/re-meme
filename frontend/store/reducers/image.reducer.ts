import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ImageSlice {
  selectedImage: string | undefined
}

const initialState : ImageSlice = {
  selectedImage: undefined
}

export const imageSlice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    setImage: (state: ImageSlice, action: PayloadAction<string | undefined>) => {
      state.selectedImage = action.payload;
    },
    removeImage: (state: ImageSlice) => {
      state.selectedImage = undefined
    },
  },
})

export const { setImage, removeImage } = imageSlice.actions

export default imageSlice.reducer