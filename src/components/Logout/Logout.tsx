"use client";

import { LogOut } from "lucide-react";

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("companyId");
    localStorage.removeItem("userId");
    localStorage.removeItem("registeredUserData");
    alert("Logged out successfully!");
  };

  return (
    <button
      type="button"
      className=" text-blue-400 py-2 px-4 rounded-md hover:text-blue-200 transition flex items-center space-x-2 cursor-pointer"
      onClick={handleLogout}
    >
      <LogOut />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
