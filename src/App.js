import React, { useState } from "react";
import "./styles.css";

import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

let idAcc = 0;
const generateId = (id) => {
  idAcc += 1;
  return idAcc;
};

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, state) => {
    const task = {
      id: generateId(),
      title: title,
      state: state
    };

    setTasks((currentTasks) => {
      return [...currentTasks, task];
    });
  };

  const updateTask = (id, title, state) => {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, title, state };
          return updatedTask;
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
  };

  const states = ["Pendente", "Fazendo", "Completa"];

  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="container">
        {states.map((state, index) => {
          return (
            <TaskList
              key={index + 1}
              title={state}
              taskState={state}
              onAddTask={addTask}
              tasks={tasks.filter((task) => task.state === state)}
              onTaskUpdate={updateTask}
              onTaskDelete={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );

  // return (
  //   <div className="App">
  //     <Navbar></Navbar>
  //     <div className="container">
  //       <TaskList
  //         title="Pendente"
  //         taskState="Pendente"
  //         onAddTask={addTask}
  //         tasks={tasks.filter((task) => task.state === "Pendente")}
  //         onTaskUpdate={updateTask}
  //       />
  //       <TaskList
  //         title="Fazendo"
  //         taskState="Fazendo"
  //         onAddTask={addTask}
  //         tasks={tasks.filter((task) => task.state === "Fazendo")}
  //         onTaskUpdate={updateTask}
  //       />
  //       <TaskList
  //         title="Completa"
  //         taskState="Completa"
  //         onAddTask={addTask}
  //         tasks={tasks.filter((task) => task.state === "Completa")}
  //         onTaskUpdate={updateTask}
  //       />
  //     </div>
  //   </div>
  // );
}
