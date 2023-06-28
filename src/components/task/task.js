import React from "react";
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends React.Component {
  state = {
    created: ''
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
    let {created} = this.props;
    created = 'created ' + formatDistanceToNow(created, { includeSeconds: true, addSuffix: true });
    this.setState({created: created});
    return created;
  }

  componentDidMount() {
    const {createdInterval} = this.props;

    this.whenCreated();
    this.timer = setInterval(
      this.whenCreated,
      createdInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { description, onDelete, onEdit, checked, onToggleDone } = this.props;

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
          <span className="created">{this.state.created}</span>
        </label>
        <button 
          className="icon icon-edit"
          onClick={onEdit}>
        </button>
        <button
          className="icon icon-destroy"
          onClick={onDelete}>
        </button>
      </div>
    )
  }

}