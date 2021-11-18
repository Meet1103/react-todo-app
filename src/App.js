import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './Components/TodoForm/TodoForm';
import TodoList from './Components/TodoList/TodoList';
import './App.css';

const getTodosFromLocalStorage = () => {
	let todosArray = localStorage.getItem('todo');

	if (todosArray !== null) {
		return JSON.parse(todosArray);
	} else {
		return [];
	}
};

const App = () => {
	const [name, setName] = useState('');
	const [todos, setTodos] = useState(
		getTodosFromLocalStorage()
	);
	const [updateId, setUpdateId] = useState(null);
	const inputRef = useRef();

	useEffect(() => {
		localStorage.setItem('todo', JSON.stringify(todos));
	}, [todos, updateId]);

	function onDragEnd(result) {
		if (!result.destination) return;

		const reorderedTodoItems = Array.from(todos);
		const [reorderedItem] = reorderedTodoItems.splice(
			result.source.index,
			1
		);
		reorderedTodoItems.splice(
			result.destination.index,
			0,
			reorderedItem
		);

		setTodos(reorderedTodoItems);
	}

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (updateId) {
			const updateTodoValue = todos.find(
				(todo, index) => todo.id === updateId
			);
			updateTodoValue.name = name;
			setName('');
			setUpdateId(null);
		} else {
			addTodo(name);
			setName('');
		}
	};

	const inputFocus = () => {
		inputRef.current.focus();
	};

	const clearTodo = (e) => {
		e.preventDefault();
		setTodos([]);
		inputFocus();
	};

	const addTodo = (name) => {
		const newTodo = {
			id: uuidv4(),
			name: name,
			completed: false
		};
		setTodos([...todos, newTodo]);
		inputFocus();
	};

	const checkTodo = (id) => {
		const completedTodo = todos.map((todo, index) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(completedTodo);
	};

	const updateTodo = (id) => {
		const updatedTodo = todos.find(
			(todo, index) => todo.id === id
		);
		setName(updatedTodo.name);
		setUpdateId(updatedTodo.id);
		inputFocus();
	};

	const deleteTodo = (id) => {
		const remainingTodos = todos.filter(
			(todo, index) => todo.id !== id
		);
		setTodos(remainingTodos);
		inputFocus();
	};

	return (
		<div className='App'>
			<header className='heading'>TODO APP</header>
			<TodoForm
				name={name}
				updateId={updateId}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				inputRef={inputRef}
			/>
			{todos.length > 0 ? (
				<div>
					<DragDropContext onDragEnd={onDragEnd}>
						<TodoList
							todos={todos}
							checkTodo={checkTodo}
							updateTodo={updateTodo}
							deleteTodo={deleteTodo}
						/>
					</DragDropContext>
					<button
						type='submit'
						onClick={clearTodo}
						className='clear-todo-list-btn'>
						Clear Todo List
					</button>
				</div>
			) : (
				<p className='initial-text'>No Todo Added</p>
			)}
		</div>
	);
};

export default App;
