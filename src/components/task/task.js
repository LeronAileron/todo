import React from "react";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends React.Component {
  state = {
    isCompleted: false,
  }

  toggleCompleted = () => {
    this.setState(state => ({isCompleted: !state.isCompleted}));
    this.props.onMarkCompleted(this.state.isCompleted);
  }

  render() {
    const { description } = this.props;

    let created = new Date();
    created = 'created ' + formatDistanceToNow(created, { includeSeconds: true, addSuffix: true });

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={this.toggleCompleted}
        />
        <label>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
    )
  }

}