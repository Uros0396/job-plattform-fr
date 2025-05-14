"use client";

import { useState } from "react";
import LoginModal from "../modals/LoginModal";
import Logout from "../Logout/Logout";

const Navbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleShowLoginModal = () => setShowLoginModal((prev) => !prev);

  return (
    <>
      {showLoginModal && (
        <div onClick={toggleShowLoginModal}>
          <LoginModal onClose={toggleShowLoginModal} />
        </div>
      )}

      <div className="bg-primary text-white py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h3 className="text-xl font-semibold">EntryLevel Opportunity</h3>
          <div>
            <button
              type="button"
              className="bg-white text-primary py-2 px-4 rounded-md hover:bg-gray-200 me-2"
              onClick={toggleShowLoginModal}
            >
              Login
            </button>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
