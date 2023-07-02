import React from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends React.Component {
  state = {
    buttons: [
      { name: 'All', key: 1, className: 'selected' },
      { name: 'Active', key: 2 },
      { name: 'Completed', key: 3 },
    ],
  }

  static propTypes = {
    onFilter: PropTypes.func.isRequired,
  }

  onFilter = (key, name) => {
    this.props.onFilter(name)

    this.setState(({ buttons }) => {
      const i = buttons.findIndex((button) => button.key === key)
      const newArr = []
      buttons.forEach((button, idx) => {
        const oldButton = button
        if (idx === i) {
          const newItem = { ...oldButton, className: 'selected' }
          newArr.push(newItem)
        } else {
          const newItem = { ...oldButton, className: null }
          newArr.push(newItem)
        }
      })

      return {
        buttons: newArr,
      }
    })
  }

  render() {
    const { buttons } = this.state
    const elements = buttons.map((button) => (
      <li key={button.key} onClick={() => this.onFilter(button.key, button.name)}>
        <button className={button.className}>{button.name}</button>
      </li>
    ))

    return <ul className="filters">{elements}</ul>
  }
}
