import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileCard } from 'entities/Profile';
import {
    profileReducer, fetchProfileData, getProfileError, getProfileIsLoading,
    getProfileReadonly,
    getProfileForm,
    getProfileValidateErrors,
    ValidateProfileError,
} from 'features/EditableProfileCard';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { profileAction } from 'features/EditableProfileCard/model/slice/profileSlice';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';

export interface ProfilePageProps {
    className?: string;
}

const initialReducers: ReducersList = {
    profile: profileReducer,
};
function ProfilePage(props: ProfilePageProps) {
    const { className } = props;
    const { t } = useTranslation('profile');
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch();

    const validateErrorTranslate = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('profile:incorrect_data'),
        [ValidateProfileError.INCORRECT_AGE]: t('profile:incorrect_age'),
        [ValidateProfileError.INCORRECT_CITY]: t('profile:incorrect_city'),
        [ValidateProfileError.NO_DATA]: t('profile:no_data'),
        [ValidateProfileError.SERVER_ERROR]: t('profile:server_error'),
    };

    // разделения выполнение кода на среды(storybook, frontend, jest)
    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileAction.updateProfile({ first: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileAction.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        // TASK: сделать регулярку на проверку ввода чисел
        dispatch(profileAction.updateProfile({ age: Number(value || 0) }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileAction.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileAction.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileAction.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency?: Currency) => {
        dispatch(profileAction.updateProfile({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country?: Country) => {
        dispatch(profileAction.updateProfile({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <Page>
                <ProfilePageHeader />
                {validateErrors?.length && validateErrors.map((error) => (
                    <Text
                        key={error}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslate[error]}
                    />
                ), [])}
                <ProfileCard
                    formData={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUsername={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    readonly={readonly}
                />
            </Page>
        </DynamicModuleLoader>
    );
}

// для асинхронных компонентов используется дефолтный экспорт
// чтобы конструкция с import('./ProfilePage') работала в ProfilePage.async.tsx
export default ProfilePage;
