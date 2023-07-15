import React from 'react'
// import { intervalToDuration, add } from 'date-fns'
import { intervalToDuration, sub } from 'date-fns'

export default class Timer extends React.Component {
  componentDidMount() {
    this.updateInterval()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startTime !== this.props.startTime || prevProps.interval !== this.props.interval) {
      this.updateInterval()
      this.timer = setTimeout(() => {
        this.updateInterval()
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  updateInterval() {
    const { startTime, updateTodoInterval, intervalInMemory } = this.props

    if (!startTime) return

    const startFromMemory = this.recountStartIfMemory(intervalInMemory, startTime)

    let addedInterval = intervalToDuration({
      start: startFromMemory || startTime,
      end: new Date(),
    })

    const convertedDuration = this.convertDuration(addedInterval)
    let { hours, minutes, seconds } = convertedDuration

    const updatedInterval = hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`

    updateTodoInterval(updatedInterval)
  }

  handlePlayClick = () => {
    const { onPlay, startTime, done } = this.props
    if (done) return
    if (!startTime) {
      onPlay()
    }
  }

  handlePauseClick = () => {
    const { onPause, startTime } = this.props
    if (startTime) {
      onPause()
    }
  }

  recountStartIfMemory(intervalInMemory, startTime) {
    if (intervalInMemory !== '00:00') {
      let intervalInMemoryArr = intervalInMemory.split(':')
      let hours, minutes, seconds
      if (intervalInMemoryArr.length === 3) {
        hours = +intervalInMemoryArr[0]
        minutes = +intervalInMemoryArr[1]
        seconds = +intervalInMemoryArr[2]
      } else {
        hours = 0
        minutes = +intervalInMemoryArr[0]
        seconds = +intervalInMemoryArr[1]
      }

      const addedFromMemory = {
        hours,
        minutes,
        seconds,
      }

      return sub(startTime, addedFromMemory)
    } else false
  }

  convertDuration(obj) {
    const outputHours = obj.hours
    let hours
    if (outputHours) {
      let hoursLength = outputHours.toString().split('').length
      hours = hoursLength === 1 ? '0'.concat(outputHours) : outputHours
    } else {
      hours = null
    }
    const outputMinutes = obj.minutes
    let minutesLength = outputMinutes.toString().split('').length
    const minutes = minutesLength === 1 ? '0'.concat(outputMinutes) : outputMinutes

    const outputSeconds = obj.seconds
    let secondsLength = outputSeconds.toString().split('').length
    const seconds = secondsLength === 1 ? '0'.concat(outputSeconds) : outputSeconds

    return {
      hours,
      minutes,
      seconds,
    }
  }

  render() {
    const { interval, intervalInMemory } = this.props

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.handlePlayClick}></button>
        <button className="icon icon-pause" onClick={this.handlePauseClick}></button>
        <span className="description__interval">{interval || intervalInMemory}</span>
      </span>
    )
  }
}
