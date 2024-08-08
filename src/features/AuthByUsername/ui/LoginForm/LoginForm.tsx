import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void
}

// вынесем отдельно для того, чтобы при перерендере компонента не создавался объект
// если бы мы указали в DynamicModuleLoader пропс reducers = { { loginForm: loginReducer } }, объект создавался бы заново
// В отдельном объекте ссылка будет постоянная и меняться не будет
const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

function LoginForm(props: LoginFormProps) {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    // все функции, которые передаем пропсом мы оборачиваем в useCallback для мемоизации
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        // если переменная принимает dispatch, то dispatch в любом случае выполняется
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, password, username]);

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onLoginClick();
        }
    }, [onLoginClick]);

    useEffect(() => {
        // вешается обработчик, когда монтируется компонент
        window.addEventListener('keydown', onKeyDown);

        // выполняется при демонтировании компонента
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            {/* DynamicModuleLoader нужен для использования useEffect(для монтирования и демонтирования) */}
            {/* это обертка для асинхронных компонентов, чтобы добавлять асинк редюсеры */}
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
        </DynamicModuleLoader>

    );
}

// убираем лишние перерисовки
export default memo(LoginForm);
