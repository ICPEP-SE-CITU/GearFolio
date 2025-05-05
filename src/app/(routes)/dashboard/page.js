"use client";

import { deleteAppwriteSession } from "@/appwrite/browser";

export default async function DashboardPage() {
  const handleLogout = async () => {
    await deleteAppwriteSession();
    window.location.href = '/login_signup';
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

