import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import TaskList from "./components/task-list";
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';


class App extends React.Component {
  state = {
    todos: [
      { description: 'Completed task', id: 1 },
      { className: 'editing', description: 'Editing task', id: 2 },
      { description: 'Active task', id: 3 },
    ]
  }

  markCompleted = (isCompleted, id) => {
    const { todos } = this.state;
    let i;
    todos.forEach((todo, idx) => {
      if (todo.id === id) i = idx;
    });

    const item = todos[i];
    if (!isCompleted) {
      item.className = 'completed';
    } else {
      item.className = null;
    }

    const stateCopy = todos.slice();
    stateCopy.splice(i, 1, item);

    this.setState(stateCopy);
    this.deleteItem(i);
  }

  deleteItem = (i) => {
    const arr = this.state.todos;
    const result = [
      ...arr.slice(0, i),
      ...arr.slice(i + 1)
    ]
    
    this.setState({todos: result})
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList
            todos={this.state.todos}
            onMarkCompleted={(isCompleted, id) => this.markCompleted(isCompleted, id)} />
          <Footer />
        </section>
      </section>
    )
  }

}

const elem = <App />

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(elem);