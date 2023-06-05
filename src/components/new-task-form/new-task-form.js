import React from "react";

import './new-task-form.css';

const NewTaskForm = () => {
  const searchText = "What needs to be done?"
  return (
    <input className="new-todo" 
           placeholder={searchText}
           autoFocus
    />
  )
}

export default NewTaskForm;