import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import Todo from '../Todo/Todo'
import './TodoList.css'

const TodoList = ({todos, checkTodo, updateTodo, deleteTodo}) => {
  return (
        <Droppable droppableId="todo">
            { provided => (
            <div className="todo-container"  {...provided.droppableProps} ref={provided.innerRef}>
            {
              todos.map((todo,index) => (
                <Todo
                key={todo.id}
                index={index}
                name={todo.name}
                completed={todo.completed}
                checkTodo={() => checkTodo(todo.id)}
                updateTodo={() => updateTodo(todo.id)}
                deleteTodo={() => deleteTodo(todo.id)}
                />
              ))
            }
            {provided.placeholder}
            </div>
            )}
        </Droppable>
  );
}

export default TodoList;