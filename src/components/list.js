import './list.css';
import ClearIcon from '@mui/icons-material/Clear';

function List(props) {

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <li key={props.id} className={`todo-item ${props.animateId === props.id ? 'sweep' : ''}`} >
      <div className="todo-left" onClick={() => props.onToggle(props.id)} >
        <div className={`custom-checkbox ${props.completed ? 'checked' : ''}`}>
          {props.completed && <span className="checkmark">✓</span>}
        </div>
      </div>
      <span className={`todo-text ${props.completed ? 'completed' : ''}`} onClick={() => props.onToggle(props.id)} >
          {props.text}
      </span>
      <div className="icon-wrapper">
          <button className="delete-button" onClick={handleClick}><ClearIcon /></button>
      </div>
    </li>
  );
}

export default List