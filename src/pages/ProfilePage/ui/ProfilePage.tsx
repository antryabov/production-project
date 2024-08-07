import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

export interface ProfilePageProps {
    className?: string;
}

const initialReducers: ReducersList = {
    profile: profileReducer,
};
function ProfilePage(props: ProfilePageProps) {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount
        >
            <div>
                {t('Профиль')}
            </div>
        </DynamicModuleLoader>

    );
}

// для асинхронных компонентов используется дефолтный экспорт
// чтобы конструкция с import('./ProfilePage') работала в ProfilePage.async.tsx
export default ProfilePage;
