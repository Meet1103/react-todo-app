import React from "react";
import {Draggable} from 'react-beautiful-dnd';
import './Todo.css'

const Todo = ({index, name ,completed, checkTodo, updateTodo, deleteTodo}) => {
    return (
        <Draggable draggableId={`todo-${index}`} key={index} index={index}>
            {
            (provided) => (
                <div className={!completed ? "todo-item" : "todo-item completed-todo-item"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <li className="todo">{name}</li>
                    <div>
                        <button className="checkbtn" onClick={checkTodo}>
                            <i className="fas fa-check-square"></i>
                        </button>
                        <button className="updatebtn" onClick={updateTodo}>
                            <i className="far fa-edit"></i>
                        </button>
                        <button className="deletebtn" onClick={deleteTodo}>
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            )
            }
        </Draggable>
    );
}

export default Todo;