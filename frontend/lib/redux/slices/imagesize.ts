import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ImageSizeSlice {
    selectedImageSize: boolean
}

const initialState: ImageSizeSlice = {
    selectedImageSize: false
}

export const imagesizeSlice = createSlice({
    name: 'imagesize',
    initialState,
    reducers: {
        setImageSize: (state, action: PayloadAction<boolean>) => {
            state.selectedImageSize = action.payload;
        },
        // removeImage: (state) => {
        //   state.selectedImageStore = null
        // },
    },
    extraReducers: {
        'HYDRATE': (state, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { setImageSize } = imagesizeSlice.actions

export default imagesizeSlice.reducer