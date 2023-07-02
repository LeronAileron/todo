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
    this.props.removeEditClass(id)
  }

  render() {
    const { todos, onDelete, onEdit, onToggleDone, filter, onEditing } = this.props

    const elements = todos.map((todo) => {
      let { className, id, done, description, created } = todo

      if (done) {
        className = 'completed'
      }

      if (className === 'editing') {
        return (
          <li className={className} id={id} key={id}>
            <Task
              description={description}
              created={created}
              // createdInterval={false}
            />
            <form onSubmit={(e) => this.onSubmit(e, id)}>
              <input
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
        <li className={className} id={id} key={id}>
          <Task
            description={description}
            checked={done}
            created={created}
            onDelete={() => onDelete(id)}
            onEdit={() => onEdit(id)}
            onToggleDone={(e) => onToggleDone(id, e)}
            // createdInterval={false}
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
