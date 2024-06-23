import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import AboutPage from 'pages/AboutPage/ui/AboutPage';
import MainPage from 'pages/MainPage/ui/MainPage';

function App() {
	const { theme, toogleTheme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<Link to={'/'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>
			<button onClick={toogleTheme}>Тема</button>

			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/about'} element={<AboutPage />} />
					<Route path={'/'} element={<MainPage />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
