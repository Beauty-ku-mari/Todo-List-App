import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState(""); // Initialize state with an empty string

  const handleAdd = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty!"); // Validate task input
      return;
    }

    axios.post("http://localhost:3001/add", { task })
      .then(() => {
        // Clear input field after adding
        setTask("");
        // Optionally, you can notify the parent component of the new task
        // For example, by using a callback function passed as a prop
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;

