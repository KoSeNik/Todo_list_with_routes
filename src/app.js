import styles from './app.module.css';
import { TaskPage } from './taskPage';
import { MainPage } from './mainPage';
import { Routes, Route, Navigate } from 'react-router-dom';

const NotFound = () => <div>Ошибка 404! Такая страница не существует!</div>;

export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="task/:id" element={<TaskPage />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
