import React from "react";
import { Navigate } from "react-router-dom";

// Dummy authentication check (replace with real auth logic)
const isAdmin = () => {
  // TODO: Replace with real authentication logic
  return localStorage.getItem("isAdmin") === "true";
};

const AdminPanel = () => {
  if (!isAdmin()) {
    // Redirect if not admin
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="rounded-lg bg-primary-foreground shadow p-6">
        <p>Welcome, Admin! Here you can manage the website content.</p>
        {/* Add admin features/components here */}
      </div>
    </div>
  );
};

export default AdminPanel;
