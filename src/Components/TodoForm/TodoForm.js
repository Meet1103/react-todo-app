import React from 'react'
import './TodoForm.css'

const TodoForm = ({
	name,
	updateId,
	handleChange,
	handleSubmit,
	inputRef,
}) => {
	return (
		<form
			className='todo-input-form'
			onSubmit={handleSubmit}>
			<input
				type='text'
				name='text'
				className='todo-input'
				autoFocus='on'
				autoComplete='off'
				ref={inputRef}
				value={name}
				onChange={handleChange}
				required
			/>
			<button type='submit' className='add-todo-btn'>
				{!updateId ? 'Add Todo' : 'Save Todo'}
			</button>
		</form>
	)
}

export default TodoForm
