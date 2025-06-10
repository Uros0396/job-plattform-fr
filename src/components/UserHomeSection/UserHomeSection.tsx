"use client";

import Link from "next/link";
import "./UserHomeSection.css";

const UserHomeSection: React.FC = () => {
  const redirectToGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/google`;
  };

  return (
    <div className="w-1/2 flex flex-col justify-evenly items-center text-center p-5 mt-40 border-e border-gray-300">
      <h2 className="text-4xl text-blue-500 font-bold font-title">
        Are you a Junior
      </h2>
      <p className="mt-1">
        <em>Signing up is the first step to getting noticed by companies!</em>
      </p>
      <div className="text-lg text-gray-800 px-20 text-left flex flex-col justify-evenly h-[400px]">
        <p>
          Immediate visibility to companies looking for junior and entry-level
          profiles.
        </p>
        <p>
          Opportunity to create a complete profile with CV, cover letter, and
          known technologies.
        </p>
        <p>
          Ideal for those at the beginning of their career who want to enter the
          tech industry.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Link href="/user-register-page">
            <button className="bg-blue-500 text-white w-full rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="col-span-12">
          <button
            type="button"
            onClick={redirectToGoogle}
            className="bg-white text-blue-500 w-full rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHomeSection;
