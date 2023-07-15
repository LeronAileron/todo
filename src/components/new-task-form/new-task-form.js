import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  state = {
    value: '',
    min: '',
    sec: '',
  }

  static propTypes = {
    onTaskAdded: PropTypes.func,
  }

  onChangeTask = (e) => {
    if (!this.props.unable) return
    this.setState({
      value: e.target.value,
    })
  }

  onChangeMin = (e) => {
    const { onChangeMin } = this.props

    this.setState({
      min: e.target.value,
    })

    onChangeMin(e)
  }

  onChangeSec = (e) => {
    const { onChangeSec } = this.props

    this.setState({
      sec: e.target.value,
    })

    onChangeSec(e)
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (!this.state.value.trim()) return
    this.props.onTaskAdded(this.state.value)
    this.setState({
      value: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { value, min, sec } = this.state
    return (
      <>
        <form className="new-todo-form" id="new-todo-form" onSubmit={this.onSubmit}>
          <input
            name="new-todo-input"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onChangeTask}
            value={value}
          />
          <input className="new-todo-form__timer" onChange={this.onChangeMin} value={min} placeholder="Min" />
          <input className="new-todo-form__timer" onChange={this.onChangeSec} value={sec} placeholder="Sec" />
        </form>
        <button className="new-todo-submit" type="submit" form="new-todo-form"></button>
      </>
    )
  }
}
