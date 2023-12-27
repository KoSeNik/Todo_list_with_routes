import { useEffect, useState } from 'react';

export const useRequestGetTodos = (refreshTodoFlag, debouncedSearchTodo, setSortTodo) => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todos?q=${debouncedSearchTodo}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false);
				setSortTodo(false);
			});
	}, [refreshTodoFlag, debouncedSearchTodo, setSortTodo]);

	return {
		todos,
		isLoading,
		setTodos,
	};
};
