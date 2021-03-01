import React, { useState, useRef } from "react";            
import './App.css';
import TodoForm from './Components/TodoForm/TodoForm'
import TodoList from './Components/TodoList/TodoList'

const App = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const inputRef = useRef()
  const [update, setUpdate] = useState(false)
  const [updateId, setUpdateId] = useState(0)

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(update) {
      const updateTodoValue = todos.find((todo,index) => todo.id === updateId);
      updateTodoValue.name = name
      setName("");
      setUpdate(false)
    } else {
        addTodo(name);
        setName("");
    }
  }

  const inputFocus = () => {
    inputRef.current.focus()
  }

  const clearTodo = (e) => {
    e.preventDefault()
    setTodos([])
    inputFocus()
  }

  const addTodo = (name) => {
    const newTodo = { id: Math.floor(Math.random() * 10000) , name: name, completed: false };
    setTodos([...todos, newTodo]);
  }

  const checkTodo = (id) => {
    const completedTodo = todos.map((todo,index) => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed}
      }
      return todo
    })
    setTodos(completedTodo)
    inputFocus()
  }

  const updateTodo = (id) => {
    const updatedTodo = todos.find((todo,index) => todo.id === id);
    setName(updatedTodo.name)
    setUpdate(true)
    setUpdateId(updatedTodo.id)
    inputFocus()
  }

  const deleteTodo = (id) => {
    const remainingTodos = todos.filter((todo,index) => todo.id !== id);
    setTodos(remainingTodos);
    inputFocus()
  } 

  return (
    <div className="App">
      <header className="heading">TODO APP</header>
      <TodoForm name={name} update={update} handleChange={handleChange} handleSubmit={handleSubmit} inputRef={inputRef} />
      {
        todos.length > 0 ? (
          <div>
            <TodoList 
            todos={todos}
            checkTodo= {checkTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            />
            <button type="submit" onClick={clearTodo} className="clear-todo-list-btn">
              Clear Todo List
            </button>
          </div>
      ) : <p className="initial-text">No Todo Added</p>
      }
    </div>
  );
}

export default App;
