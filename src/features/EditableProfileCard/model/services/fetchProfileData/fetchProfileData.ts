import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profileSchema';
// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<string>
    >(
        'profile/fetchProfileData',
        async (profileId, thunkAPI) => {
            const { extra, rejectWithValue } = thunkAPI;
            try {
                const response = await extra.api.get<Profile>(`/profile/${profileId}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                console.log(error);
                return rejectWithValue('error');
            }
        },
    );
