import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}
function LoginForm(props: LoginFormProps) {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // обычно нужно разбивать на множество селекторов, но из-за того, что форма маленькая, то перерисовки здесь не так страшны
    const {
        username, password, error, isLoading,
    } = useSelector(getLoginState);

    // все функции, которые передаем пропсом мы оборачиваем в useCallback для мемоизации
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {/* перевод на ошибку будет добавлять уже в самом тексте, чтобы не было артефактов в стейте, когда язык поменян, */}
            { /* а в стейте остался один перевод */}
            {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}
            <Input
                autofocus
                placeholder={t('Имя пользователя')}
                className="input"
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                placeholder={t('Пароль')}
                className="input"
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>

        </div>
    );
}

// убираем лишние перерисовки
export default memo(LoginForm);
