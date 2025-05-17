"use client";

import Link from "next/link";

const CompanyHomeSection: React.FC = () => {
  return (
    <div className="w-1/2 flex flex-col justify-evenly items-center text-center p-5 mt-90">
      <h2 className="text-4xl text-blue-500 font-bold mb-4 font-title">
        Are you a Company
      </h2>
      <p className="mt-8 mb-6">
        <em>New minds, big ideas: meet the talents of the future.</em>
      </p>
      <div className="text-lg text-gray-800 px-20 text-left flex flex-col justify-evenly h-[400px]">
        <p>
          Access to a curated network of junior candidates, categorized by
          technology.
        </p>
        <p>
          Fast and targeted search: filter candidates based on the tech stack
          you're interested in.
        </p>
        <p>
          A great starting point to build a strong team by investing in emerging
          talent.
        </p>
      </div>
      <div className="col-span-12 text-center mt-8">
        <Link href="/company-register-page">
          <button className="bg-blue-500 text-white w-50 h-7 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyHomeSection;
