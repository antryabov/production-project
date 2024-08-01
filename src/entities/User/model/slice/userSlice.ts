import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {
    authData: undefined,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
});

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice;
