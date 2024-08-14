import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { getUserMounted, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from 'widgets/Navbar';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';

function App() {
    const dispatch = useAppDispatch();
    const mounted = useSelector(getUserMounted);
    // проверка на авторизированного пользователя
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch, mounted]);

    return (
        <div className={classNames('app', {}, [])}>
            {/* suspense нужен для i18n. Можно указать фоллбек, если много текста, который будет долго грузиться */}
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {/* отрисовываем страницы в content-page */}
                    {mounted && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
