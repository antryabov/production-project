import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import Text from 'shared/ui/Text/Text';
import { memo } from 'react';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';
import { getProfileData } from '../model/selectors/getProfileData/getProfileData';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading/getProfileIsLoading';

interface ProfileCardProps {
className?: string;
}
function ProfileCard(props: ProfileCardProps) {
    const { className } = props;
    // выбираем ns
    const { t } = useTranslation('profile');

    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                {/* Чтобы не было вложенностей в файле profile, то пишем namespaces:key */}
                <Text title={t('profile:profile')} />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.editBtn}
                >
                    {t('profile:edit')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.first}
                    placeholder={t('profile:your_name')}
                    className={cls.input}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('profile:your_lastname')}
                    className={cls.input}
                />
            </div>
        </div>
    );
}

export default memo(ProfileCard);
