// src/components/ToDoList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, toggleComplete } from './todosSlice';

function ToDoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo({ id: Date.now(), text: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  const handleToggleComplete = id => {
    dispatch(toggleComplete(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  }

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
