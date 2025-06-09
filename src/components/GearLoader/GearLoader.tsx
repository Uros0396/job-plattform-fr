"use client";

import { FC } from "react";
import { FaCog } from "react-icons/fa";

const GearLoader: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FaCog className="animate-spin text-blue-500 text-6xl" />
    </div>
  );
};

export default GearLoader;
