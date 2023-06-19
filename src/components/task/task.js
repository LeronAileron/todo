import React from "react";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends React.Component {
  render() {
    const { description, onDelete, checked, onToggleDone } = this.props;

    let created = new Date();
    created = 'created ' + formatDistanceToNow(created, { includeSeconds: true, addSuffix: true });

    return (
      <div className="view" 
        onClick={onToggleDone}>
        <input
          className="toggle"
          type="checkbox"
          checked={checked}
          readOnly
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