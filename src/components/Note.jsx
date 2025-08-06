import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`${API_URL}api/keep`, {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      // console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading notes...</p>;

  if (notes.length === 0) {
    return (
      <div className="text-center mt-4">
        <p>No notes available. Start adding some!</p>
      </div>
    );
  }
  return (
    <div className="p-4 grid gap-4 sm:grid-cols-4 lg:grid-cols-5">
      {notes.map((note) => (
        <div
          key={note._id}
          className="shadow-md rounded-lg p-4 border bg-gray-700 border-gray-200"
        >
          <h2 className="text-lg font-bold mb-1">{note.title}</h2>
          <p className="text-sm text-gray-700">{note.notes}</p>

          {note.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {note.tags.map((tag, i) => (
                <span key={i} className=" text-xs px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-right text-xs text-gray-500 mt-2">
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
