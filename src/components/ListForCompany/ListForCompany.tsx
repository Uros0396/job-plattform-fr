"use client";

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../reducer/getDataUser";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface CandidateListForCompany {
  name: string;
  surname: string;
  dob: string;
  username: string;
  email: string;
  password: string;
  role: "user";
  address: string;
  img: {
    data: any;
    contentType: string;
    originalName: string;
  };
  cv: {
    data: any;
    contentType: string;
    originalName: string;
  };
  coverLetter: string;
  technologies: string;
  workPreference: "remote" | "on-site" | "hybrid";
  availableFrom: string;
  relocation: string;
  _id: string;
}

const ListForCompany: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4750";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-md mx-auto p-4 bg-gray-100">
      {allUsers.map((user) => (
        <div
          key={user._id}
          className="bg-white text-center shadow-md rounded-lg"
        >
          <div className="flex justify-center pt-4 bg-blue-100">
            {" "}
            <img
              src={`${API_URL}/users/${user._id}/image`}
              alt={`${user.name} ${user.surname}`}
              className="h-40 w-42 border-2 border-blue-200 rounded-md"
            />
          </div>
          <div className="p-4 bg-blue-100">
            <h5 className="text-xl font-semibold mb-5">
              {user.name} {user.surname}
            </h5>

            <p className="text-sm grid text-gray-500">
              <strong>Address:</strong>
            </p>
            <p className="text-sm">{user.address}</p>
            <p className="text-sm grid mt-2 text-gray-500">
              <strong>Technologies:</strong>
            </p>
            <p className="max-w-xs text-sm break-words">
              {Array.isArray(user.technologies)
                ? user.technologies.join(", ")
                : typeof user.technologies === "string"
                ? user.technologies
                : ""}
            </p>
            <div className="border-t px-4 py-2  text-sm text-center mt-4">
              <a
                href={`${API_URL}/users/${user._id}/cv`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 text-center"
              >
                View CV
              </a>
            </div>

            {/*}
            <p className="text-sm grid">
              <strong>Email:</strong>
            </p>
            <p className="max-w-xs text-sm break-words">{user.email}</p>
            <p className="text-sm grid">
              <strong>Work Preference:</strong> {user.workPreference}
            </p>
            <p className="text-sm grid">
              <strong>Available From:</strong> {user.availableFrom}
            </p>
            <p className="text-sm mb-4">
              <strong>Relocation:</strong> {user.relocation}
            </p>
            <div className="flex flex-col gap-2">
           
              <a
                href={user.coverLetter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                View Cover Letter
              </a>
            </div>*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListForCompany;
