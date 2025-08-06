import React, { useState } from "react";
import Tasks from "./Tasks";
import Note from "./Note";

export default function TabView({ tasks, loadingTask, handleTask }) {
  const [activeTab, setActiveTab] = useState("tasks");

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "tasks"
              ? "border-b-2 border-blue-500  bg-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("tasks")}
        >
          Tasks
        </button>
        <button
          className={`ml-4 px-4 py-2 font-medium ${
            activeTab === "note"
              ? "border-b-2 border-blue-500  bg-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("note")}
        >
          Notes
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "tasks" && (
          <Tasks
            tasks={tasks}
            loadingTask={loadingTask}
            handleTask={handleTask}
          />
        )}
        {activeTab === "note" && <Note />}
      </div>
    </div>
  );
}
