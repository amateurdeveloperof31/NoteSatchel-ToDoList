import { useState } from 'react';
import './list.css';
import NotesIcon from '@mui/icons-material/Notes';

let todoId = 0;

function AddList(props) {
    let writing_effect = new Audio('./assets/effects/writing.mp3')
    const [todo, setTodo] = useState({
        id: "",
        text: "",
        completed: false
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTodo((prevTodo) => {
      return {
        ...prevTodo,
        [name]: value,
      };
    });
  }
  
  function submitTodo(event) {
    if (!todo.text.trim()) {
        alert("Please enter a task");
        return;
    }
    writing_effect.play();
    todoId++;
    props.onAdd({ id: todoId, text: todo.text, completed: false });
    setTodo({
      id: "",
      text: "",
      completed: "false"
    });
    event.preventDefault();
  }

  return (
        <div className="todo-add">
          <div className="icon-wrapper"> <NotesIcon /> </div>
          <input type="text" name="text" value={todo.text} placeholder="Add a new task" onChange={handleChange} required/>
          <button className="add-button" onClick={submitTodo}>Add</button>
        </div>
  );
}

export default AddList