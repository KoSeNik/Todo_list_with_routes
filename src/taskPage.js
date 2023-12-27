import { useState } from 'react';
import {
	useRequestEditTodo,
	useRequestDeleteTodo,
	useRequestCompletedTodo,
	useRequestGetTodoById,
} from './hooks';
import styles from './app.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskPage = () => {
	const [updateTodo, setUpdateTodo] = useState(false);
	const [isEditItem, setIsEditItem] = useState(false);
	const [newTitleTodo, setNewTitleTodo] = useState('');

	const { requestEditTodo } = useRequestEditTodo(newTitleTodo);
	const { isDeleting, requestDeleteTodo } = useRequestDeleteTodo();
	const { isCompleted, requestCompletedTodo } = useRequestCompletedTodo();

	const navigate = useNavigate();
	const params = useParams();
	const { todo } = useRequestGetTodoById(params.id, updateTodo, setUpdateTodo);

	const { title, completed, id } = todo;

	const handleEditItem = () => {
		setIsEditItem((prevState) => !prevState);
	};

	return (
		<>
			{!isEditItem ? (
				<div className={`${styles.todo} ${styles.todo_full_description}`}>
					<div>
						{title} - {completed === 'true' ? 'выполнено' : 'не выполнено'}
					</div>
					<button
						className={styles.button}
						onClick={() => {
							handleEditItem();
						}}
					>
						Изменить дело
					</button>
					<button
						className={styles.button}
						disabled={isCompleted}
						onClick={() => {
							requestCompletedTodo(id);
							setUpdateTodo(true);
						}}
					>
						Выполнить дело
					</button>
					<button
						className={styles.button}
						disabled={isDeleting}
						onClick={() => {
							requestDeleteTodo(id);
							navigate('/');
						}}
					>
						Удалить дело
					</button>
					<button className={styles.button} onClick={() => navigate('/')}>
						Вернуться назад
					</button>
				</div>
			) : (
				<div className={`${styles.todo} ${styles.todo_full_description}`}>
					<input
						className={styles.input}
						value={newTitleTodo}
						placeholder="Введите новое название задачи"
						onChange={(e) => {
							setNewTitleTodo(e.target.value);
						}}
					/>
					<button
						className={styles.button}
						onClick={() => {
							requestEditTodo(id);
							handleEditItem();
							setUpdateTodo(true);
						}}
					>
						Сохранить
					</button>
					<button
						className={styles.button}
						onClick={() => {
							handleEditItem();
						}}
					>
						Отменить
					</button>
				</div>
			)}
		</>
	);
};
