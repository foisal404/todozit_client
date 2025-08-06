import React from "react";

export default function TitleCard({ title, subtitle }) {
  return (
    <div className="mb-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold text-white-800">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
