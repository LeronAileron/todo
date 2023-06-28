import React from "react";
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  state = {
    value: ""
  }

  static propTypes = {
    onTaskAdded: PropTypes.func,
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.value.trim()) return;
    this.props.onTaskAdded(this.state.value);
    this.setState({
      value: ""
    })
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onChange}
          value={this.state.value}
        />
      </form>

    )
  }

}