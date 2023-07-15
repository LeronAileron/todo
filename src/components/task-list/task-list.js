import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './task-list.css'

export default class TaskList extends React.Component {
  static defaultProps = {
    onEdit: () => {},
  }

  static propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  onSubmit = (e, id) => {
    e.preventDefault()
    if (this.props.dontSubmit) return
    this.props.removeEditClass(id)
  }

  render() {
    const { todos, onDelete, onEdit, onToggleDone, filter, onEditing, editedId, onPlay, updateTodoInterval, onPause } =
      this.props

    const elements = todos.map((todo) => {
      let { id, done, description, created, startTime, interval, intervalInMemory } = todo

      if (editedId === id) {
        return (
          <li className={'editing'} id={id} key={id}>
            <Task description={description} created={created} />
            <form name="edit-task-form" onSubmit={(e) => this.onSubmit(e, id)}>
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
}
