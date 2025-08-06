import axios from "axios";

export default function TaskModal({
  isOpen,
  showModalType,
  onClose,
  userEmail,
  handleTask,
  handleTasks,
  task,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert number fields to actual numbers
    const val =
      name === "plannedDuration" || name === "timeSpent"
        ? Number(value)
        : value;

    handleTask((prevTask) => ({ ...prevTask, [name]: val }));
  };
  // console.log(task);
  const handleSubmit = async () => {
    try {
      if (showModalType === "Edit") {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}api/tasks/${task._id}`,
          task,
          { withCredentials: true }
        );
        handleTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? res.data : t))
        );
        onClose();
        return;
      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/tasks`,
        {
          ...task,
          userEmail,
        },
        { withCredentials: true }
      );
      handleTasks((prevTasks) => [...prevTasks, res.data]);
      onClose();
    } catch (err) {
      console.log(userEmail);
      console.error("Error creating task:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {`${showModalType}`} Task
        </h2>
        <label>Title</label>
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-2 border p-2 rounded bg-slate-700
           text-white"
        />
        <label>description</label>
        <textarea
          name="description"
          value={task.description}
          maxLength={150}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-2 border p-2 rounded bg-slate-700
           text-white"
        />

        <div className="flex gap-2 mb-2">
          <div className="w-full">
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border p-2 rounded  bg-slate-700
           text-white"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="w-full">
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded  bg-slate-700
           text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <label>dueDate</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="w-full mb-2 border p-2 rounded  bg-slate-700
           text-white"
        />

        <div className="flex gap-2">
          <div className="w-full">
            <label>plannedDuration</label>
            <input
              name="plannedDuration"
              type="number"
              value={task.plannedDuration}
              onChange={handleChange}
              placeholder="Planned Duration (in hours)"
              className=" mb-2 border p-2 rounded  bg-slate-700
           text-white"
            />
          </div>
          <div className="w-full">
            <label>timeSpent</label>
            <input
              name="timeSpent"
              type="number"
              value={task.timeSpent}
              onChange={handleChange}
              placeholder="Time Spent (in hours)"
              className="w-full mb-4 border p-2 rounded  bg-slate-700
           text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
