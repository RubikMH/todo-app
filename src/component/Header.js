import React, { useState } from "react";

function Header() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingTex, setEditingTex] = useState("");
  // const [value, setValue] = useState("")

  function handelInput(e) {
    setTodo(e.target.value);
  }
  function handelSubmit(e) {
    e.preventDefault();
    if (todo) {
      const values = { id: new Date().getTime(), text: todo, complete: false };

      setTodos([...todos].concat(values));

      setTodo("");
    }
  }
  function deleteTodos(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }
  function toggleTodos(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingTex;
      }
      console.log(todo);
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingTex("");
  }

  return (
    <div className="header">
      <form onSubmit={handelSubmit} >
        <input
          type="text"
          className="input"
          name="input"
          placeholder="what is the plan to daye"
          value={todo}
          onChange={handelInput}
        />
        <button type="submit" id="btn-primary" name="submit">
          submit
        </button>
      </form>

      {todos.map((todo) => (
        <div key={todo.id} id={todo.id} className="main">
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingTex(e.target.value)}
              value={editingTex}
            />
          ) : (
            <p className={todo.complete ? "checked" : ""}>{todo.text}</p>
          )}

          <button onClick={() => deleteTodos(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleTodos(todo.id)}
            checked={todo.complete}
          />
          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>submit edit </button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>edit todo</button>
          )}
        </div>
      ))}
    </div>
  );
}
export default Header;
