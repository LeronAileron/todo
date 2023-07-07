function findTodoIdx(id) {
  const i = this.state.todos.findIndex((el) => el.id === id)
  return i
}

export default findTodoIdx
