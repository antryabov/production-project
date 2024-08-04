import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        // тип PayloadAction - какие данные он ожидает в пейлоаде
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                state.username = action.payload.username;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                // если rejected, то в пейлоад уже придет текст ошибки, который указали в thunkAPI.rejectWithValue
                state.error = action.payload;
            });
    },
});

export const {
    actions: loginActions,
    reducer: loginReducer,
} = loginSlice;
