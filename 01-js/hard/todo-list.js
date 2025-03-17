/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = []
  }

  add(todo) {

    this.todos.push(todo)
  }

  remove(index) {

    if (index < 0 || index > this.todos.length-1)
      console.log('error')
    else
      this.todos.splice(index,1)
  }

  update(index, update) {

    if (index < 0 || index > this.todos.length-1)
      console.log('error')
    else
      this.todos[index] = update
  }

  getAll() {
    return this.todos
  }

  get(index) {

    if (index < 0 || index > this.todos.length-1)
      return null
    else
      return this.todos[index]
  }

  clear() {
    this.todos.length = 0
  }

}

module.exports = Todo;
