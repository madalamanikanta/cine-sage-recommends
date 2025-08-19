import { useState, useEffect } from "react";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);

  // Example: listening to localStorage for "recentActivity"
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentActivity")) || [];
    setActivities(stored);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Recent Activity</h1>
      {activities.length === 0 ? (
        <p className="text-gray-500">No activity yet. Start exploring!</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((act, idx) => (
            <li
              key={idx}
              className="p-3 rounded-xl shadow bg-white border border-gray-200"
            >
              {act}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Utility to record activity anywhere in app
export const addActivity = (msg) => {
  let stored = JSON.parse(localStorage.getItem("recentActivity")) || [];
  stored.unshift(`${msg} • ${new Date().toLocaleString()}`);
  localStorage.setItem("recentActivity", JSON.stringify(stored));
};
