import React from "react";
import ItemStatusFilter from "../itemStatusFilter/ItemStatusFilter";
import AppHeader from "../appHeader/AppHeader";
import SearchPanel from "../searchPanel/SearchPanel";
import TodoList from "../todoList/TodoList";

const App = () => {
  const todoData = [
    { id: 1, label: "Drink coffie", important: false },
    { id: 2, label: "Make awsome app", important: true },
    { id: 3, label: "Have a lunch", important: false }
  ];
  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} />
    </div>
  );
};

export default App;
