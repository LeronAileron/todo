import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { intervalToDuration, sub } from 'date-fns'

const Timer = ({ startTime, updateTodoInterval, intervalInMemory, onPlay, onPause, done, interval }) => {
  useEffect(() => {
    updateInterval()
  }, [])

  useEffect(() => {
    updateInterval()
    const timer = setTimeout(() => {
      updateInterval()
    }, 1000)

    return () => clearTimeout(timer)
  }, [startTime, interval])

  function updateInterval() {
    if (!startTime) return

    const startFromMemory = recountStartIfMemory(intervalInMemory, startTime)

    let addedInterval = intervalToDuration({
      start: startFromMemory || startTime,
      end: new Date(),
    })

    const convertedDuration = convertDuration(addedInterval)
    let { hours, minutes, seconds } = convertedDuration

    const updatedInterval = hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`

    updateTodoInterval(updatedInterval)
  }

  function handlePlayClick() {
    if (done) return
    if (!startTime) {
      onPlay()
    }
  }

  function handlePauseClick() {
    if (startTime) {
      onPause()
    }
  }

  function recountStartIfMemory(intervalInMemory, startTime) {
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

  function convertDuration(obj) {
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

  return (
    <span className="description">
      <button className="icon icon-play" onClick={handlePlayClick}></button>
      <button className="icon icon-pause" onClick={handlePauseClick}></button>
      <span className="description__interval">{interval || intervalInMemory}</span>
    </span>
  )
}

Timer.propTypes = {
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  updateTodoInterval: PropTypes.func,
  intervalInMemory: PropTypes.string,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  done: PropTypes.bool.isRequired,
  interval: PropTypes.string,
}

export default Timer
