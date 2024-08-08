import { classNames } from 'shared/lib/classNames/classNames';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from 'widgets/Navbar';
import { AppRouter } from './providers/router';

function App() {
    const dispatch = useAppDispatch();

    // проверка на авторизированного пользователя
    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            {/* suspense нужен для i18n. Можно указать фоллбек, если много текста, который будет долго грузиться */}
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {/* отрисовываем страницы в content-page */}
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
