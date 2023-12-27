import { useState } from 'react';
import styles from './app.module.css';
import { useRequestGetTodos, useRequestAddTodo } from './hooks';
import { TodoItem } from './todoItem';
import { useDebounce } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';

export const MainPage = () => {
	const [refreshTodoFlag, setRefreshTodoFlag] = useState(false);
	const [searchTodo, setSearchTodo] = useState('');
	const debouncedSearchTodo = useDebounce(searchTodo, 1000);

	const [sortTodoFlag, setSortTodoFlag] = useState(false);

	const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);

	const { todos, setTodos, isLoading } = useRequestGetTodos(
		refreshTodoFlag,
		debouncedSearchTodo,
		setSortTodoFlag,
	);
	const { isCreating, requestAddTodo } = useRequestAddTodo(refreshTodo);

	const handleSearch = (e) => {
		setSearchTodo(e.target.value);
	};

	const sortTodo = () => {
		const copyData = todos.slice();
		const sortData = copyData.sort((a, b) => a.title.localeCompare(b.title));
		setTodos(sortData);
		setSortTodoFlag(true);
	};
	return (
		<>
			<div className={styles.header}>Список дел</div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				todos.map((todo) => (
					<Link to={`task/${todo.id}`} key={todo.id}>
						<TodoItem {...todo} />
					</Link>
				))
			)}
			<button
				disabled={isCreating}
				onClick={requestAddTodo}
				className={styles.button}
			>
				Добавить дело
			</button>
			<input
				value={searchTodo}
				onChange={handleSearch}
				placeholder="Поиск дела"
				className={styles.input_search}
			/>
			<button
				onClick={sortTodo}
				className={`${styles.button} ${sortTodoFlag ? styles.buttonPressed : ''}`}
			>
				Сортировка дел по алфавиту
			</button>
		</>
	);
};
