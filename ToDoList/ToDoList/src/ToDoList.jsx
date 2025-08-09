import React, { useState } from "react";


// const [state变量, setState函数] = useState(初始值);

/*
	•	state变量：当前的状态值
	•	setState函数：更新状态的函数（调用它会触发组件重新渲染）
	•	初始值：第一次渲染时状态的默认值

“useState 管变量，setState 改变量”
“不要直接改，要用 set”
“依赖旧值，用函数式更新”
*/

function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Eat breakfast" },
    { id: 2, text: "Take a shower" },
    { id: 3, text: "Walk the dog" },
  ]);


  const [newTask, setNewTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    const text = newTask.trim();
    if (text !== "") {
      setTasks((prev) => [
        ...prev,
        { id: Date.now(), text }, // 稳定 id
      ]);
      setNewTask("");
    }
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const arr = [...tasks];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      setTasks(arr);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const arr = [...tasks];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      setTasks(arr);
    }
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={task.id}>
            <span className="text">{task.text}</span>

            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              Delete
            </button>

            <button className="move-button" onClick={() => moveTaskUp(index)}>
              Up
            </button>

            <button className="move-button" onClick={() => moveTaskDown(index)}>
              Down
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
