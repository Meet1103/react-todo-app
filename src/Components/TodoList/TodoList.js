import React from 'react'
import Todo from '../Todo/Todo'
import './TodoList.css';

const TodoList = ({todos, checkTodo, updateTodo, deleteTodo}) => {
  return (
    <div className="todo-container">
    {
      todos.map((todo,index) => (
        <Todo 
          key={todo.id}
          id={todo.id}
          name={todo.name}
          completed={todo.completed}
          checkTodo={() => checkTodo(todo.id)}
          updateTodo={() => updateTodo(todo.id)}
          deleteTodo={() => deleteTodo(todo.id)}
        />
      ))
    }
    </div>
  );
}

export default TodoList;