import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../tasks-filter';

import './footer.css';

const Footer = ({ left, onFilter, onDeleteCompleted }) => {
  let item;
  if (left > 1 || left === 0) {
    item = 'items';
  } else {
    item = 'item';
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {left}
        {' '}
        {item}
        {' '}
        left
      </span>
      <TaskFilter
        onFilter={(name) => onFilter(name)}
      />
      <button
        className="clear-completed"
        onClick={onDeleteCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  left: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  onDeleteCompleted: PropTypes.func.isRequired,
};

export default Footer;
