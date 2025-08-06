import TaskCard from "./TaskCard";

export default function Tasks({ tasks, loading, handleTask }) {
  const onDelete = async (taskId) => {
    handleTask((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };
  if (loading) return <p className="text-center mt-4">Loading tasks...</p>;

  if (tasks.length === 0) {
    return (
      <div className="text-center mt-4">
        <p>No tasks available. Start adding some!</p>
      </div>
    );
  }
  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
