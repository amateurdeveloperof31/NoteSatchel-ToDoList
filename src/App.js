import React, { useState, useEffect } from 'react';
import List from './components/list';
import './components/list.css';
import AddList from './components/addList';
import { fetchData } from './utils/FetchData';
import { saveData } from './utils/SaveData';
import { deleteData } from './utils/DeleteData';

export default function App() {

  const [todos, setTodos] = useState({});
  const [animateId, setAnimateId] = useState(null);
  const [nextItemId, setNextItemId] = useState(1);

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

  useEffect(() => {
    fetchData().then(({ todoItems, nextItemId }) => {
      setTodos(todoItems);
      setNextItemId(nextItemId);
    });
  }, []);

  async function addTodo(newTodo) {
    await saveData(setTodos, newTodo);
  }  

  function deleteTodo(key) {
    deleteData(key).then(() => {
      delete_effect.play();
      setTodos((prevTodos) => {
        const newTodos = { ...prevTodos };
        delete newTodos[key];
        return newTodos;
      });
    });
  }  

  return (
    <div className="app">
      <div className="todo-container">
        <div className="todo-header">
          <h1 className="todo-title">To-Do List</h1>
        </div>
        <AddList id={nextItemId} onAdd={addTodo}  />
        <ul className="todo-list">
          {Object.keys(todos).map((index) => (
              <List key={index} id={todos[index].id} text={todos[index].text} completed={todos[index].completed} animateId={animateId}
              onToggle={toggleTodo} onDelete={deleteTodo} dataKey={index}
              />
          ))}
        </ul>
      </div>
    </div>
  );
}
