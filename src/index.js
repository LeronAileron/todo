import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import TaskList from "./components/task-list";
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';


class App extends React.Component {
  maxId = 100;

  state = {
    todos: [
      this.createTask('Completed task'),
      this.createTask('Editing task'),
      this.createTask('Active task'),
      // { description: 'Completed task', id: 1 },
      // { className: 'editing', description: 'Editing task', id: 2 },
      // { description: 'Active task', id: 3 },
    ]
  }

  createTask(description) {
    return {
      description,
      done: false,
      id: this.maxId++,
    }
  }

  toggleCompleted = (done, id) => {
    const { todos } = this.state;

    const i = todos.findIndex(el => el.id === id);
    const item = todos[i]
    console.log('item with index ', i, ' is ', item);

    if (!done) {
      item.className = 'completed';
    } else {
      item.className = null;
    }

    const stateCopy = JSON.parse(JSON.stringify(todos));
    stateCopy.splice(i, 1, item);

    this.setState(stateCopy);
  }

  deleteItem = id => {
    this.setState( ({ todos }) => {
      const i = todos.findIndex(el => el.id === id);

      const newArr = [
        ...todos.slice(0, i),
        ...todos.slice(i + 1)
      ]

      return {
        todos: newArr
      }
    })
  }

  onToggleDone = id => {
    console.log('toggle completed', id);
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
            onToggleCompleted={this.toggleCompleted} 
            onDelete={this.deleteItem}
            // onToggleDone={this.onToggleDone}
            />
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