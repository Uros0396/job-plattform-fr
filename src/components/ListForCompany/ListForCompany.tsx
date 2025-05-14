"use client";

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../reducer/getDataUser";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";

interface CandidateListForCompany {
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

const ListForCompany: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const allUsers = useSelector(
    (state: RootState) => state.dataSlice.data as CandidateListForCompany[]
  );
  const listLoading = useSelector(
    (state: RootState) => state.dataSlice.loading
  );
  const listError = useSelector((state: RootState) => state.dataSlice.error);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  if (listLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (listError) {
    return <p className="text-center text-red-500">Error: {listError}</p>;
  }

  if (allUsers.length === 0) {
    return <p className="text-center text-gray-500">No candidates found</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {allUsers.map((user) => (
        <div
          key={user._id}
          className="w-full sm:w-[300px] bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={user.img}
            alt={`${user.name} ${user.surname}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h5 className="text-xl font-semibold mb-2">
              {user.name} {user.surname}
            </h5>
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {user.address}
            </p>
            <p className="text-sm">
              <strong>Technologies:</strong> {user.technologies.join(", ")}
            </p>
            <p className="text-sm">
              <strong>Work Preference:</strong> {user.workPreference}
            </p>
            <p className="text-sm">
              <strong>Available From:</strong> {user.availableFrom}
            </p>
            <p className="text-sm mb-4">
              <strong>Relocation:</strong> {user.relocation}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={user.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                View CV
              </a>
              <a
                href={user.coverLetter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                View Cover Letter
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListForCompany;
