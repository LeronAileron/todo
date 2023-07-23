import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

const NewTaskForm = ({ unable, onChangeMin, onChangeSec, onTaskAdded, editing }) => {
  const [value, setValue] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  function onChangeTask(e) {
    console.log(unable)
    if (!unable || editing) return

    setValue(e.target.value)
  }

  function onMin(e) {
    if (!unable || editing) return
    setMin(e.target.value)

    onChangeMin(e)
  }

  function onSec(e) {
    if (!unable || editing) return
    setSec(e.target.value)

    onChangeSec(e)
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onTaskAdded(value)

    setValue('')
    setMin('')
    setSec('')
  }

  return (
    <>
      <form className="new-todo-form" id="new-todo-form" onSubmit={onSubmit}>
        <input
          name="new-todo-input"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onChangeTask}
          value={value}
        />
        <input className="new-todo-form__timer" onChange={onMin} value={min} placeholder="Min" />
        <input className="new-todo-form__timer" onChange={onSec} value={sec} placeholder="Sec" />
      </form>
      <button className="new-todo-submit" type="submit" form="new-todo-form"></button>
    </>
  )
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
}

export default NewTaskForm
