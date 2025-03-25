import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  function addTodo() {
    const newTodo = {
      title,
      description,
      id: uuidv4()
    }
    setTodos([...todos, newTodo])
    setTitle('')
    setDescription('')
  }

  function removeTodo(id) {
    const updatedArray = todos.filter(todo => todo.id !== id)
    setTodos(updatedArray)
  }
  
  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Todo List</h1>
        <p>Organize your tasks with ease</p>
      </div>
      
      <div className="todo-input">
        <input 
          type="text" 
          placeholder="Todo Title" 
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          placeholder="Todo Description" 
          rows="3" 
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={addTodo}>Add Todo</button>
      </div>
      
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-item-content">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="todo-actions">
              <button 
                className="delete" 
                onClick={() => removeTodo(todo.id)}
              >
                ✗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
