import React from "react";
import Task from "../task";

import './task-list.css';

export default class TaskList extends React.Component {
 
  render() {
    const { todos, onMarkCompleted } = this.props;

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
            // onMarkCompleted={(isCompleted) => this.markCompleted(isCompleted)}
            onMarkCompleted={(isCompleted) => onMarkCompleted(isCompleted, id)}
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