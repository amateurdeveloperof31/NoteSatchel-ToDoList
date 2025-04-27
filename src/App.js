import React from 'react';
import List from './components/list';
import './components/list.css';
import AddList from './components/addList';
import { useState } from 'react';

export default function App() {

  const [todos, setTodos] = useState([]);

  const [animateId, setAnimateId] = useState(null);

  let delete_effect = new Audio('./assets/effects/delete.mp3');
  let complete_effect = new Audio('./assets/effects/complete.mp3');

  const toggleTodo = (id) => {
    setAnimateId(id);
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    !todos.find(todo => todo.id === id).completed && complete_effect.play();
    setTimeout(() => setAnimateId(null), 400);
  };

  function addTodo(newTodo) {
    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });
  }

  function deleteTodo(id) {
    delete_effect.play();
    setTodos((prevTodos) => {
      return prevTodos.filter((todo, index) => {
        return todo.id !== id;
      });
    });
  }

  return (
    <div className="app">
      <div className="todo-container">
        <div className="todo-header">
          <h1 className="todo-title">To-Do List</h1>
        </div>
        <AddList onAdd={addTodo}  />
        <ul className="todo-list">
          {todos.map((todo, index) => (
              <List 
                key={index}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                animateId={animateId}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
          ))}
        </ul>
      </div>
    </div>
  );
}