import styles from './app.module.css';

export const TodoItem = (todo) => {
	return (
		<div className={`${styles.todo} ${styles.todo_short_description}`}>
			{todo.title} - {todo.completed === 'true' ? 'выполнено' : 'не выполнено'}
		</div>
	);
};
