import React from "react";
import Task from "../task";

import './task-list.css';

export default class TaskList extends React.Component {
 
  render() {
    const { todos, onDelete, onToggleDone, filter } = this.props;

    const elements = todos.map(todo => {
      let { className, id, done, description } = todo;

      if (done) {
        className = 'completed';
      }

      if (className === 'editing') {
        return (
          <li
            className={className}
            key={id}>
            <Task
              {...description}
            />
            <input type="text" className="edit" defaultValue='Editing task' />
          </li>
        )
      }

      return (
        <li
          className={className}
          key={id}>
          <Task
            description={description}
            checked={done}
            onDelete={() => onDelete(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        </li>
      )
    })

    // почему el.props.className? что это такое? что есть el.props ?
    const elementsFiltered = elements.filter(el => {
      if (filter === 'All') return el;
      if (filter === 'Completed') return el.props.className === 'completed';
      return el.props.className !== 'completed';
    })
    
    return (
      <ul className="todo-list">
        {elementsFiltered}
      </ul>
    )
  }

}