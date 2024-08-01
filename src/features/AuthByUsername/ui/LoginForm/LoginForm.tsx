import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import { useState } from 'react';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}
export function LoginForm(props: LoginFormProps) {
    const { className } = props;
    const { t } = useTranslation();

    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input
                autofocus
                placeholder={t('Имя пользователя')}
                className="input"
                value={usernameValue}
                onChange={setUsernameValue}
            />
            <Input
                placeholder={t('Пароль')}
                className="input"
                value={passwordValue}
                onChange={setPasswordValue}
            />
            <Button
                className={cls.loginBtn}
            >
                {t('Войти')}
            </Button>
        </div>
    );
}
