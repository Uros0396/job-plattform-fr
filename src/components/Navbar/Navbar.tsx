"use client";

import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import Logout from "../Logout/Logout";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();

  const toggleShowLoginModal = () => setShowLoginModal((prev) => !prev);
  const isHomePage = pathname === "/";

  return (
    <>
      {showLoginModal && (
        <div onClick={toggleShowLoginModal}>
          <LoginModal onClose={toggleShowLoginModal} />
        </div>
      )}

      <div
        className={`${isHomePage ? "bg-white" : "bg-blue-100"} text-black py-3`}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo solo se non homepage */}
          {!isHomePage && (
            <Link href={"/"}>
              {" "}
              <Image
                src="/assets/ChatGPT_Image_17_mag_2025__16_21_28-removebg-preview.png"
                alt="img"
                width={100}
                height={100}
              />
            </Link>
          )}

          {/* Spazio a destra per Login (solo homepage) + Logout (sempre) */}
          <div className="flex flex-col items-end space-y-2 ml-auto">
            {isHomePage && (
              <button
                type="button"
                className="bg-white text-blue-400 py-2 px-4 rounded-md hover:text-blue-200 cursor-pointer"
                onClick={toggleShowLoginModal}
              >
                Login
              </button>
            )}
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
