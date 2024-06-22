import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

function App() {
	const { theme, toogleTheme } = useTheme();

	return (
		<div className={classNames('app', {}, [theme])}>
			<Link to={'/'}>Главная</Link>
			<Link to={'/about'}>О сайте</Link>
			<button onClick={toogleTheme}>Тема</button>

			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={'/about'} element={<AboutPageAsync />} />
					<Route path={'/'} element={<MainPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
