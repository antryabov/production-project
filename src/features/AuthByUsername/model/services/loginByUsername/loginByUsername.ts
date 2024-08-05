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
// createAsyncThunk - это action creator, который возвращает action после вызова
// dispatch отработает 3 раза: 1. Когда происходит вызов loginByUsername
// 2. когда происходит вызов thunkAPI.dispatch(userActions.setAuthData(response.data));
// 3. Когда уже приходит со статусом fulfilled, когда делаем return response.data
// если ошибка, то выполнится 2 dispatch'а (вызов и возврат ошибки 'error')
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>( // 1
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            // сохраняем данные в стейт юзера
            thunkAPI.dispatch(userActions.setAuthData(response.data)); // 2

            return response.data; // 3
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
