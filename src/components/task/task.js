import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import Timer from '../timer'

const Task = (props) => {
  const {
    createdInterval,
    checked,
    created,
    onDelete,
    onEdit,
    onToggleDone,
    description,
    startTime,
    onPlay,
    updateTodoInterval,
    interval,
    onPause,
    intervalInMemory,
  } = props

  const [createdHere, setCreatedHere] = useState('')
  // const [stop, setStop] = useState(true)

  function whenCreated() {
    const createdFormated = `created ${formatDistanceToNow(created, { includeSeconds: true, addSuffix: true })}`
    setCreatedHere(createdFormated)
  }

  // function componentDidMount() {
  // const { createdInterval } = this.props

  //   whenCreated()
  //   const timer = setInterval(whenCreated, createdInterval)
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer)
  //   }

  useEffect(() => {
    whenCreated()
    const timer = setInterval(whenCreated, createdInterval)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="view" onClick={onToggleDone}>
      <input name="task" className="toggle" type="checkbox" checked={checked} readOnly />
      <label>
        <span className="title">{description}</span>
        <Timer
          onPlay={onPlay}
          startTime={startTime}
          updateTodoInterval={updateTodoInterval}
          interval={interval}
          onPause={onPause}
          intervalInMemory={intervalInMemory}
          done={checked}
        />
        <span className="description">{createdHere}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdit} />
      <button className="icon icon-destroy" onClick={onDelete} />
    </div>
  )
}

Task.defaultProps = {
  createdInterval: 5000,
  checked: true,
  created: new Date(),
}

Task.propTypes = {
  createdInterval: PropTypes.number,
  checked: PropTypes.bool,
  created: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default Task
