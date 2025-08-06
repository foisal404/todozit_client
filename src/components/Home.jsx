import { useAuth } from "../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import NavHead from "./NavHead";
import { useEffect, useState } from "react";
import TabView from "./TabView";
import TaskModal from "./TaskModal";
import axios from "axios";
import TitleCard from "./TitleCard";

export default function Home() {
  const user = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loadingTask, setLoadingTask] = useState(true);
  // console.log(tasks);

  // modal states
  const [add, setAdd] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // functions
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}api/tasks`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoadingTask(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleClick = () => {
    if (user.user) {
      setAdd(!add);
    } else {
      window.location.href = `${import.meta.env.VITE_API_URL}auth/google`;
    }
  };

  return (
    <div className="h-screen relative">
      <NavHead />
      <TitleCard
        title="Your Tasks"
        subtitle="Manage your tasks and keeps here"
      />
      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userEmail={user.user?.email}
        handleTask={setTasks}
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-2 rounded absolute bottom-14 left-4"
      >
        <FaPlus />
      </button>
      {add && (
        <div className="absolute bottom-14 left-20 flex gap-3 space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 px-3 text-xs "
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 px-3 text-xs ">
            Add Note
          </button>
        </div>
      )}
      <TabView tasks={tasks} loadingTask={loadingTask} handleTask={setTasks} />
    </div>
  );
}
