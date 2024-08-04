import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string
}

// Из-за того, что текст нужной ошибки выводим в компоненте, а нам если потребуется обработка многих ошибок
// то создаем енам и пишем код ошибок и в компоненте в зависимости от ошибки пишем нужный текст
/* enum LoginErrors {
    INCORRECT_DATA = '',
    SERVER_ERROR = '',
} */

// третий тип принимает AsyncThunkConfig, где можно переназначить какое-то поле
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            // сохраняем данные в стейт юзера
            thunkAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
