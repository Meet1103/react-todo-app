import React from "react";
import './Todo.css'

const Todo = ({id ,name ,completed, checkTodo, updateTodo, deleteTodo}) => {
    return (
        <div className={!completed ? "todo-item" : "todo-item completed-todo-item"}>
            <li className="todo">{name}</li>
            <div>
                <button className="checkbtn" onClick={() => checkTodo(id)}>
                    <i className="fas fa-check-square"></i>
                </button>
                <button className="updatebtn" onClick={() => updateTodo(id)}>
                    <i className="far fa-edit"></i>
                </button>
                <button className="deletebtn" onClick={() => deleteTodo(id)}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
}

export default Todo;
