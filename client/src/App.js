import React, {useState} from "react";
// do I need to add space before and after use state
import './App.css';

function App() {

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (e) => {
    e.preventDefault();

    if (newTodo.length === 0) {
      return;
    }
    
    const todoItem = {
      text: newTodo,
      complete: false
    }

    console.log(newTodo);
    setTodos([...todos, todoItem]);
    setNewTodo("")
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todos, i) => {
      return i !== delIdx;
    });

    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todos, i) => {
      if (idx === i) {
        todos.complete = !todos.complete;
        // Best practice, but commenting out to avoid mutating
        // const updatedTodos = {...todos, complete: !todos.complete};
        // return updatedTodos;
      }

      return todos;
    });

    setTodos(updatedTodos);
  }

  const [todoList, setTodoList] = useState([]);
  
  return (
    <div style={{textAlign: "center"}}>
      <form onSubmit={(event) => {
        handleNewTodoSubmit(event);
      }}>
        <input onChange={(event) => {
          setNewTodo(event.target.value);
        }} type="text" value={newTodo} />
        <div>
          <button>Add</button>
        </div>
      </form>

      <hr />

      {
      todos.map((todos, i) => {
        const todoClasses = ["bold", "italic"];

        if (todos.complete) {
          todoClasses.push("line-through");
        }

          return (
            <div key={i}>
              <input onChange={(event) => {
                handleToggleComplete(i);
              }}
              checked={todos.complete}
              type="checkbox" />
              <span className={todoClasses.join(" ")}>{todos.text}</span>
              <button
              onClick={(event) => {
              handleTodoDelete(i);
              }}
              style={{marginLeft: "10px"}}>Delete</button>
            </div>
          );
          return (
            <div className="App">
              <Form todoList={todoList} setTodoList={setTodoList} />
              <Display todoList={todoList} setTodoList={setTodoList} />
            </div>
          );
      })}
    </div>
  );
}

export default App;
