import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import { intervalToDuration } from 'date-fns'

import Timer from '../timer'

export default class Task extends React.Component {
  state = {
    created: '',
    stop: true,
  }

  static defaultProps = {
    createdInterval: 5000,
    checked: true,
    created: new Date(),
  }

  static propTypes = {
    createdInterval: PropTypes.number,
    checked: PropTypes.bool,
    created: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
  }

  whenCreated = () => {
    let { created } = this.props
    created = `created ${formatDistanceToNow(created, { includeSeconds: true, addSuffix: true })}`
    this.setState({ created })
    return created
  }

  componentDidMount() {
    const { createdInterval } = this.props

    this.whenCreated()
    this.timer = setInterval(this.whenCreated, createdInterval)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {
      onToggleDone,
      description,
      onDelete,
      onEdit,
      checked,
      startTime,
      onPlay,
      updateTodoInterval,
      interval,
      onPause,
      intervalInMemory,
    } = this.props

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
          <span className="description">{this.state.created}</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={onDelete} />
      </div>
    )
  }
}
