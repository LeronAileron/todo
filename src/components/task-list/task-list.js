import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

const TaskList = (props) => {
  const {
    onEdit,
    onDelete,
    onToggleDone,
    onEditing,
    filter,
    todos,
    dontSubmit,
    removeEditClass,
    editedId,
    onPlay,
    onPause,
    updateTodoInterval,
  } = props

  function onSubmit(e, id) {
    e.preventDefault()
    if (dontSubmit) return
    removeEditClass(id)
  }

  const elements = todos.map((todo) => {
    let { id, done, description, created, startTime, interval, intervalInMemory } = todo

    if (editedId === id) {
      return (
        <li className={'editing'} id={id} key={id}>
          <Task description={description} created={created} />
          <form name="edit-task-form" onSubmit={(e) => onSubmit(e, id)}>
            <input
              name="edit-task-input"
              id="edit"
              autoFocus
              type="text"
              className="edit"
              value={description}
              onChange={(e) => onEditing(id, e)}
            />
          </form>
        </li>
      )
    }

    return (
      <li className={done ? 'completed' : null} id={id} key={id}>
        <Task
          description={description}
          checked={done}
          created={created}
          onDelete={() => onDelete(id)}
          onEdit={() => onEdit(id)}
          onToggleDone={(e) => onToggleDone(id, e)}
          onPlay={() => onPlay(id)}
          startTime={startTime}
          updateTodoInterval={(interval) => updateTodoInterval(id, interval)}
          interval={interval}
          onPause={() => onPause(id)}
          intervalInMemory={intervalInMemory}
        />
      </li>
    )
  })

  // почему el.props.className? что это такое? что есть el.props ?
  const elementsFiltered = elements.filter((el) => {
    if (filter === 'All') return el
    if (filter === 'Completed') return el.props.className === 'completed'
    return el.props.className !== 'completed'
  })

  return <ul className="todo-list">{elementsFiltered}</ul>
}

TaskList.defaultProps = {
  onEdit: () => {},
}

TaskList.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  editedId: PropTypes.number,
  filter: PropTypes.string.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  dontSubmit: PropTypes.bool.isRequired,
  removeEditClass: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  updateTodoInterval: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
}

export default TaskList
