import { FaRegLightbulb } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export default function NavHead() {
  const { user, loading } = useAuth();
  return (
    <nav className="flex items-center justify-between shadow px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <FaRegLightbulb className="text-yellow-500 text-xl" />
        <span className="text-xl font-medium">Task & Keep</span>
      </div>

      <div className="flex items-center space-x-4">
        {loading ? (
          <span className="text-sm text-gray-600 animate-pulse">
            Loading...
          </span>
        ) : user ? (
          <span className="text-sm text-gray-700 flex items-center">
            {user.photo ? (
              <img
                src={user.photo || "https://via.placeholder.com/150"}
                alt="User"
                className="w-8 h-8 rounded-full ml-2"
              />
            ) : (
              user.name
            )}
            <button
              className="ms-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() =>
                (window.location.href = `${
                  import.meta.env.VITE_API_URL
                }auth/logout`)
              }
            >
              Logout
            </button>
          </span>
        ) : (
          <button
            className="text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => {
              window.location.href = `${
                import.meta.env.VITE_API_URL
              }auth/google`;
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
