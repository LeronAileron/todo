import React from "react";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends React.Component {
  state = {
    done: false,
  }

  toggleCompleted = () => {
    this.setState(state => ({done: !state.done}));
    this.props.onToggleCompleted(this.state.done);
  }

  render() {
    const { description, onDelete, onToggleDone } = this.props;

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
        <button 
          className="icon icon-destroy"
          onClick={onDelete}>
        </button>
      </div>
    )
  }

}