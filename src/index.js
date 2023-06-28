import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import TaskList from "./components/task-list";
import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';


class App extends React.Component {
  maxId = 100;

  state = {
    // todos: [],
    todos: [
      this.createTask('Drink cola'),
      this.createTask('Eat cheaps'),
      this.createTask('Complete React'),
    ],
    filter: 'All',
    editing: 0,
  }

  createTask(description) {
    const date = new Date();
    return {
      description,
      done: false,
      id: this.maxId++,
      created: date,
    }
  }

  deleteCompleted = () => {
    const { todos } = this.state;
    const completed = todos.filter(el => el.done === true);
    completed.forEach(el => this.deleteItem(el.id));
  }

  deleteItem = (id) => {
    if (this.state.editing) return;
    this.setState(({ todos }) => {
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

  editItem = (id) => {
    const editCounter = this.state.editing + 1;

    this.setState({
      editing: editCounter
    })

    this.setState(({ todos }) => {
      const i = this.findTodoIdx(id);
      return this.changeKeyInTodos(i, todos, 'className', 'editing');
    })
  }

  editingItem = (id, e) => {
    this.setState(({ todos }) => {
      let value = e.target.value;
      const i = this.findTodoIdx(id);
      return this.changeKeyInTodos(i, todos, 'description', value);
    })
  }

  removeEditClass = (id) => {
    this.setState({
      editing: 0
    })

    this.setState(({ todos }) => {
      const i = this.findTodoIdx(id);
      return this.changeKeyInTodos(i, todos, 'className', null)
    })

  }

  onToggleDone = (id, e) => {
    if (this.state.editing) return;
    if (e.target.classList.contains('icon-edit') || e.target.classList.contains('icon-destroy')) return;
    this.setState(({ todos }) => {
      const i = todos.findIndex(el => el.id === id);
      const oldItem = todos[i];
      return this.changeKeyInTodos(i, todos, 'done', !oldItem.done);
    })

  }

  onFilter = name => {
    this.setState({ filter: name })
  }

  addItem = (input) => {
    const newItem = this.createTask(input);

    this.setState(({ todos }) => {
      const newArr = [
        ...todos,
        newItem
      ]

      return {
        todos: newArr
      }
    })
  }

  findTodoIdx(id) {
    const i = this.state.todos.findIndex(el => el.id === id);
    return i;
  }

  changeKeyInTodos(i, todos, keyToChange, newValue) {
    const oldItem = todos[i];
    const newItem = { ...oldItem, [keyToChange]: newValue };
    const newArr = [
      ...todos.slice(0, i),
      newItem,
      ...todos.slice(i + 1)
    ]
    return {
      todos: newArr
    }
  }

  render() {
    const { todos, filter } = this.state;
    const doneCount = todos
                          .filter(el => el.done)
                          .length;
    const tasksLeft = todos.length - doneCount;

    window.addEventListener('click', (e) => {
      let newArr = [];
      if ( this.state.editing === 2 ||
          (!e.target.classList.contains('icon-edit') && 
          !e.target.closest('.editing')) ) {

        newArr = this.state.todos.map(todo => {
          if (todo.className === 'editing') {
            todo.className = null;
          }
          return todo;
        })
      } else return;

      this.setState({editing: 0})
      this.setState({ todos: newArr })
    })

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todos}
            filter={filter}
            onDelete={this.deleteItem}
            onEdit={this.editItem}
            onToggleDone={this.onToggleDone}
            onEditing={this.editingItem}
            removeEditClass={this.removeEditClass}
          />
          <Footer
            left={tasksLeft}
            onFilter={this.onFilter}
            onDeleteCompleted={this.deleteCompleted}
          />
        </section>
      </section>
    )
  }

}

const elem = <App />

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(elem);