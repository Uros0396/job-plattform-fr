"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Logged out successfully!");
        router.push("/");
      } else {
        alert("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error", error);
      alert("Error during logout");
    }
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
