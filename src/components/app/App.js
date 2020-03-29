import React, { Component } from "react";
import ItemStatusFilter from "../itemStatusFilter/ItemStatusFilter";
import AppHeader from "../appHeader/AppHeader";
import SearchPanel from "../searchPanel/SearchPanel";
import TodoList from "../todoList/TodoList";
import AddItem from "../addItem/AddItem";

class App extends Component {
  maxId = 100;
  constructor() {
    super();

    this.state = {
      todoData: [
        this.createTodoItem("Drink coffie"),
        this.createTodoItem("Make awsome app"),
        this.createTodoItem("Have a lunch")
      ],
      term: "",
      filter: "all" //active all done
    };
  }

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label: label,
      important: false,
      done: false
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const befor = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const newArray = [...befor, ...after];

      return {
        todoData: newArray
      };
    });
  };

  addItem = text => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text);
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, prop) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [prop]: !oldItem[prop] };

    const befor = arr.slice(0, idx);
    const after = arr.slice(idx + 1);
    return [...befor, newItem, ...after];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = term => {
    this.setState({
      term: term
    });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  onFilterChange = filter => {
    this.setState({
      filter: filter
    });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
