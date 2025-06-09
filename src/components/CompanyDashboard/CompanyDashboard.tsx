/*"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (inputValue.trim() === "") {
      setUsers([]);
    }
  }, [inputValue]);

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
    <div className="container mx-auto p-2 mt-4 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Dashboard</h2>
      <div className="flex flex-col lg:flex-row gap-10">
     

        <div className="lg:w-1/2">
          <div className="flex flex-col gap-4 p-5 border border-gray-300">
            <p className="py-2 text-gray-500">
              <em>
                Here you can discover entry-level and junior candidates,
                filtered by the technologies you’re looking for.
              </em>
            </p>
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
            <h4 className="text-xl font-semibold text-gray-700"></h4>
            {users.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="text-gray-600 border-b border-gray-200 mt-4 list-none"
                  >
                    <span className="font-medium text-gray-800">
                      {user.name} {user.surname}
                    </span>{" "}
                    — <span className="text-sm italic">{user.coverLetter}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500"></p>
            )}
          </div>
        </div>

       

        <div className="lg:w-1/2">
          <ListForCompany />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;*/

"use client";

import { useEffect, useState } from "react";
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
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4750";

  // Debounce: aspetta 500ms dopo l'ultimo input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // Quando il valore "debounced" cambia, parte la fetch
  useEffect(() => {
    const fetchCandidates = async () => {
      const cleaned = debouncedValue
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((tech) => tech !== "");

      if (cleaned.length === 0) {
        setUsers([]);
        return;
      }

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
          console.warn(data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUsers([]);
      }
    };

    fetchCandidates();
  }, [debouncedValue]);

  return (
    <div className="container mx-auto p-2 mt-4 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Dashboard</h2>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Search & Results */}
        <div className="lg:w-1/2">
          <div className="flex flex-col gap-4 p-5 border border-gray-300 rounded-lg shadow-sm">
            <p className="py-2 text-gray-500 italic">
              Type to search candidates by technology. Results update
              automatically.
            </p>

            <input
              type="text"
              placeholder="e.g. React, Node, HTML"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {users.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="flex items-center gap-2 text-gray-600 border-b border-gray-200 pb-2 list-none"
                  >
                    {" "}
                    <img
                      src={`${API_URL}/users/${user._id}/image`}
                      alt={`${user.name} ${user.surname}`}
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="font-medium text-gray-800">
                      {user.name} {user.surname}
                    </span>
                    <span className="text-sm italic">
                      {user.technologies.join(" / ")}
                    </span>
                  </li>
                ))}
              </ul>
            ) : debouncedValue.trim() !== "" ? (
              <p className="text-red-400 italic">No candidates found.</p>
            ) : null}
          </div>
        </div>

        {/* Extra Content */}
        <div className="lg:w-1/2">
          <ListForCompany />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
