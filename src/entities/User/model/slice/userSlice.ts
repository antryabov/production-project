import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User, UserSchema } from '../types/UserSchema';

const initialState: UserSchema = {
    authData: undefined,
    _mounted: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        // проверяем авторизован ли этот пользователь, если вкладку закрыл и открыл заново
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
            // AppRouter рендерится быстрее чем происходит авторизация, поэтому не работают как нужно приватные пути
            // маунтим AppRouter, когда пользователь уже авторизовался или не авторизовался, если пользователь не найден,
            // чтобы вернуть children в RequireAuth вместо Navigate
            state._mounted = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
});

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice;
