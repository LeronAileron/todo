import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

// export default class TaskFilter extends React.Component {
const TaskFilter = ({ onFilter }) => {
  // state = {
  //   buttons: [
  //     { name: 'All', key: 0 },
  //     { name: 'Active', key: 1 },
  //     { name: 'Completed', key: 2 },
  //   ],
  //   checked: 'All',
  // }

  const buttons = [
    { name: 'All', key: 0 },
    { name: 'Active', key: 1 },
    { name: 'Completed', key: 2 },
  ]

  const [checked, useChecked] = useState('All')

  function changeChecked(e) {
    useChecked(e.target.value)
  }

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
        onChange={changeChecked}
      />
      {button.name}
    </label>
  ))

  return <div className="filters">{elements}</div>
}

TaskFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
}

export default TaskFilter
