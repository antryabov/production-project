import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
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
// createAsyncThunk - это action creator, который возвращает action после вызова и используем потом в dispatch - (dispatch(loginByUsername({username, password})))
// dispatch отработает 3 раза: 1. Когда происходит вызов loginByUsername
// 2. когда происходит вызов thunkAPI.dispatch(userActions.setAuthData(response.data));
// 3. И когда ответ приходит со статусом fulfilled, когда делаем return response.data
// если ошибка, то выполнится 2 dispatch'а (вызов и возврат ошибки 'error')
// ThunkConfig нужен для extra и ошибки(+ дженерик ошибки)
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>( // 1
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        const { dispatch, extra, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            // сохраняем данные в стейт юзера
            dispatch(userActions.setAuthData(response.data)); // 2
            return response.data; // 3
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
