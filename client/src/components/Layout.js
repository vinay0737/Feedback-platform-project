import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">FeedbackFlow</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>
          <Link
            to="/create"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Create Form
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="block w-full text-left hover:bg-red-600 p-2 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}

export default Layout;
