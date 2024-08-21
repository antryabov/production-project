import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNewCommentSchema } from '../types/addNewComment';

const initialState: addNewCommentSchema = {
    text: '',
};

export const addNewCommentSlice = createSlice({
    name: 'addNewComment',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProfileData.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
    //             state.data = action.payload;
    //             state.form = action.payload;
    //             state.isLoading = false;
    //         })
    //         .addCase(fetchProfileData.rejected, (state, action) => {
    //             state.error = action.payload;
    //             state.isLoading = false;
    //         });
    // },
});

export const {
    actions: addNewCommentActions,
    reducer: addNewCommentReducer,
} = addNewCommentSlice;
