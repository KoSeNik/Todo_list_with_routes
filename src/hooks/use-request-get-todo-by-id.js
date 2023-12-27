import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRequestGetTodoById = (todoId, updateTodo, setUpdateTodo) => {
	const [todo, setTodo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todos/${todoId}`)
			.then((loadedData) => loadedData.json())
			.then((loadedTodo) => {
				if (Object.keys(loadedTodo).length === 0) {
					navigate('/404');
				}
				setTodo(loadedTodo);
			})
			.finally(() => {
				setIsLoading(false);
				setUpdateTodo(false);
			});
	}, [setUpdateTodo, todoId, updateTodo, navigate]);

	return {
		todo,
		isLoading,
	};
};
