import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileError } from '../../types/profileSchema';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
// <возвращаемое тип, тип параметров, ThunkConfig с любым дженериком>
// async thunk - являются action'нами
export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        // получаем данные из формы
        const formData = getProfileForm(getState());

        const errors = validateProfileData(formData);

        if (errors.length) {
            // ошибки валидации
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);
            // ошибки сервера
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
