import React from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends React.Component {
  state = {
    buttons: [
      { name: 'All', key: 0 },
      { name: 'Active', key: 1 },
      { name: 'Completed', key: 2 },
    ],
    checked: 'All',
  }

  static propTypes = {
    onFilter: PropTypes.func.isRequired,
  }

  changeChecked = (e) => {
    this.setState({
      checked: e.target.value,
    })
  }

  render() {
    const { buttons, checked } = this.state
    const { onFilter } = this.props

    const elements = buttons.map((button) => (
      <label
        className={checked === button.name ? 'selected' : null}
        key={button.key}
        onClick={() => onFilter(button.name)}
      >
        <input
          className="filters__input"
          type="radio"
          name="filter"
          value={button.name}
          checked={checked === button.name ? true : false}
          onChange={this.changeChecked}
        />
        {button.name}
      </label>
    ))

    return <div className="filters">{elements}</div>
  }
}
