import React from "react";
import axios from "axios";
import { BsTrash2 } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

export default function TaskCard({ task, onEdit, onDelete }) {
  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}api/tasks/${task._id}`,
        { withCredentials: true }
      );
      onDelete(task._id);
    } catch (err) {
      // console.error("Failed to delete task:", err);
      // alert("Something went wrong!");
    }
  };

  return (
    <div className="shadow-md rounded-lg p-4 border bg-gray-700 border-gray-200">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{task.title}</h2>
        <div className=" flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sm text-yellow-500 rounded hover:bg-yellow-600"
          >
            <BiEdit size={20} />
          </button>
          <button
            onClick={handleDelete}
            className=" text-sm text-red-500 hover:bg-red-600"
          >
            <BsTrash2 size={20} />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-200">{task.description}</p>
      <div className="mt-2 text-sm space-y-1">
        <p>
          <strong>Status:</strong> {task.status}
        </p>
        <p>
          <strong>Priority:</strong> {task.priority}
        </p>
        <p>
          <strong>Due:</strong>{" "}
          {task.dueDate === Date.now()
            ? "Today"
            : new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Planned Duration:</strong> {task.plannedDuration} hrs
        </p>
        <p>
          <strong>Time Spent:</strong> {task.timeSpent} hrs
        </p>
      </div>
    </div>
  );
}
