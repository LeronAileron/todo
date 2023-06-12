import React from "react";
import Task from "../task";

import './task-list.css';

export default class TaskList extends React.Component {
 
  render() {
    const { todos, onToggleCompleted, onDelete, onToggleDone } = this.props;

    const elements = todos.map(todo => {
      const { className, id, ...description } = todo;

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
          className={ className }
          key={id}>
          <Task
            {...description}
            onToggleCompleted={(done) => onToggleCompleted(done, id)}
            onDelete={() => onDelete(id)}
            // onToggleDone={() => onToggleDone(id)}
          />
        </li>
      )
    })
    return (
      <ul className="todo-list">
        {elements}
      </ul>
    )
  }

}