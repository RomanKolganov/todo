import React from "react";
import TodoListItem from "../todoListItems/TodoListItem";
import "./todoList.css";

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = todos.map(item => {
    const { id, ...restProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...restProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });
  return <ul className="list-group todoList">{elements}</ul>;
};

export default TodoList;
