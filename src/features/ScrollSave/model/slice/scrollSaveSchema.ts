import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { scrollSaveSchema } from '../types/scrollSaveSchema';

const initialState: scrollSaveSchema = {
    scroll: {},
};

export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{path: string; position: number}>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const {
    actions: scrollSaveActions,
    reducer: scrollSaveReducer,
} = scrollSaveSlice;
