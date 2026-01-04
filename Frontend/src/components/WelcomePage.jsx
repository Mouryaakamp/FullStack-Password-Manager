import React from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          🔐 Password Manager
        </h1>

        <p className="text-gray-600 text-sm mb-8">
          Securely store and manage your passwords using
          <br />
          <span className="font-semibold">Local Storage</span> or{" "}
          <span className="font-semibold">Database Storage</span>
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/log-in")}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/sign-in")}
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Database storage requires a valid DB connection string in
          <code className="bg-gray-100 px-1 rounded mx-1">.env</code> file.
        </p>

      </div>
    </div>
  );
}
