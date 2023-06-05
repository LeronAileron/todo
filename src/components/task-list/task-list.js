import React from "react";
import Task from "../task";

import './task-list.css';

const TaskList = ({ todos }) => {
  const elements = todos.map(todo => {
    const { className, edit, ...todoKeys } = todo;

    if (className === 'editing') {
      return (
        <li className={className}>
          <Task {...todoKeys} />
          <input type="text" className="edit" defaultValue='Editing task' />
        </li>
      )
    }

    return (
      <li className={className}>
        <Task {...todoKeys} />
        <input type="text" className="edit" value='Editing task' />
      </li>
    )
  })

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )
}

export default TaskList;