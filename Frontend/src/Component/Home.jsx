import React, { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-hot-toast";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTasks, setNewTasks] = useState("");

  useEffect(() => {
    const fetchtasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/tasks", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.task);
        setTasks(response.data.task);
        setError(null);
      } catch (error) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchtasks();
  }, []);

  const createTask = async () => {
    if (!newTasks) return;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        {
          description: newTasks,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTask);
      toast.success("Task created successfully");
      setTasks([...tasks, response.data.newTask]);

      setNewTasks("");
    } catch (error) {
      setError("Failed to create task");
    }
  };

  const taskStatus = async (id) => {
    const task = tasks.find((t) => t._id === id);

    if (!task) {
      console.error(`Task with ID ${id} not found.`);
      setError("Task not found. Please check the ID.");
      return;
    }

    console.log("Found task:", task);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/tasks/${id}`,
        {
          ...task,
          completed: !task.completed,
        },
        { withCredentials: true }
      );
      console.log("Updated task:", response.data.task);
      toast.success("Task status updated successfully");
      setTasks(tasks.map((t) => (t._id === id ? response.data.task : t)));
    } catch (error) {
      console.error("Error updating task:", error.message);
      setError("Failed to update task status.");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task Deleted Successfully");
    } catch (error) {
      setError("Failed to Delete Task");
    }
  };

  const navigateTo = useNavigate();

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const remainingTodos = tasks.filter((task) => !task.completed).length;

  return (
    <>
      <div className=" my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
        <h1 className="text-2xl font-semibold text-center">Task Manager</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTasks}
            onChange={(e) => setNewTasks(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createTask()}
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          />
          <button
            onClick={createTask}
            className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
          >
            Add
          </button>
        </div>
        {loading ? (
          <div className="text-center justify-center">
            <span className="textgray-500">Loading...</span>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-semibold">{error}</div>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={tasks._id || index}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => taskStatus(task._id)}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-800 font-semibold"
                        : ""
                    } `}
                  >
                    {task.description}
                  </span>
                </div>
                <button
                  onClick={() => todoDelete(task._id)}
                  className="text-red-500 hover:text-red-800 duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-center text-sm text-gray-700">
          {remainingTodos} remaining tasks
        </p>
        <button
          onClick={() => logout()}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Home;
