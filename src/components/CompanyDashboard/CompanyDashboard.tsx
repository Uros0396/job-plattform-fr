"use client";

import { useState } from "react";
import ListForCompany from "../../components/ListForCompany/ListForCompany";

interface CandidateForCompanyList {
  name: string;
  surname: string;
  dob: string;
  username: string;
  email: string;
  password: string;
  role: "user";
  address: string;
  img: string;
  cv: string;
  coverLetter: string;
  technologies: string[];
  workPreference: "remote" | "on-site" | "hybrid";
  availableFrom: string;
  relocation: string;
  _id: string;
}

const CompanyDashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<CandidateForCompanyList[]>([]);

  const handleSearch = async () => {
    const cleaned = inputValue
      .toLowerCase()
      .trim()
      .split(" ")
      .filter((tech) => tech !== "");

    if (cleaned.length === 0) return;

    const query = cleaned.join(",");

    try {
      const res = await fetch(
        `http://localhost:4750/users/technologies?techs=${query}`
      );
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
      } else {
        setUsers([]);
        console.log(data.message);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Dashboard Company
          </h2>
          <ListForCompany />
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search by technologies"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4"
            >
              Search
            </button>
            <h4 className="text-xl font-semibold text-gray-700">Candidates:</h4>
            {users.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {users.map((user) => (
                  <li key={user._id} className="text-gray-600">
                    <span className="font-medium text-gray-800">
                      {user.name} {user.surname}
                    </span>{" "}
                    —{" "}
                    <span className="text-sm italic">
                      {user.technologies.join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No Candidates</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
