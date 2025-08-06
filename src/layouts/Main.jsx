import React from "react";
import { FaPlus } from "react-icons/fa";

export default function Main() {
  return (
    <div className="h-screen relative">
      <button className="bg-blue-500 text-white p-2 rounded absolute bottom-28 left-4">
        <FaPlus />
      </button>
      <div className=" overflow-y-auto">
        <h2>hello</h2>
      </div>
    </div>
  );
}
