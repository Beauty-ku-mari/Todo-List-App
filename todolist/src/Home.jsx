import { useState, useEffect } from "react";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsTrash } from "react-icons/bs"; // Import BsTrash for delete icon
import Create from "./Create";


function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`)
      .then(() => {
        // Update state without reloading
        setTodos(todos.map(todo => 
          todo._id === id ? { ...todo, done: !todo.done } : todo
        ));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Remove deleted item from state without reloading
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create />
      <br />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div className="delete-icon">
              <BsTrash className="icon" onClick={() => handleDelete(todo._id)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;

