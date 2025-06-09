/*"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CompUserDetailPage = () => {
  const { id } = useParams();
  const allUsers = useSelector((state: RootState) => state.dataSlice.data);
  const user = allUsers.find((u) => u._id === id);

  if (!user) {
    return (
      <p className="text-center text-gray-500">
        Candidate not found or loading...
      </p>
    );
  }

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4750";

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <img
        src={`${API_URL}/users/${user._id}/image`}
        alt={user.name}
        className="w-40 h-40 object-cover mx-auto rounded-full"
      />
      <h1 className="text-2xl font-bold text-center mt-4">
        {user.name} {user.surname}
      </h1>
      <p className="text-center text-gray-600">{user.email}</p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Technologies:</strong> {user.technologies}
        </p>
        <p>
          <strong>Work Preference:</strong> {user.workPreference}
        </p>
        <p>
          <strong>Available From:</strong> {user.availableFrom}
        </p>
        <p>
          <strong>Relocation:</strong> {user.relocation}
        </p>
        <a
          href={`${API_URL}/users/${user._id}/cv`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          View CV
        </a>
      </div>
    </div>
  );
};

export default CompUserDetailPage;*/

"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getUserById,
  selectUserById,
  isUserLoading,
  userError,
} from "@/reducer/userByIdSlice";
import GearLoader from "@/components/GearLoader/GearLoader";

const CompUserDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUserById);
  const loading = useSelector(isUserLoading);
  const error = useSelector(userError);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <GearLoader />;
  }

  if (error || !user) {
    return (
      <p className="text-center text-gray-500">
        Candidate not found or an error occurred.
      </p>
    );
  }

  return (
    <div className="p-10 max-w-xl mx-auto bg-white rounded shadow">
      <img
        src={user.imageUrl}
        alt={user.name}
        className="w-40 h-40 object-cover mx-auto rounded-full border-10 border-blue-200"
      />
      <h1 className="text-2xl font-bold text-center mt-10">
        {user.name} {user.surname}
      </h1>

      <div className="text-center">
        <a
          className="text-blue-400 hover:text-blue-200"
          href={`mailto:${user.email}`}
        >
          {user.email}
        </a>
      </div>

      <hr className="mt-8 text-gray-300" />

      <div className="mt-4 space-y-6 text-sm mt-20 p-4">
        <p>
          <strong>DOB:</strong> {user.dob}
        </p>

        <p>
          <strong>Technologies:</strong> {user.technologies.join(" / ")}
        </p>
        <p>
          <strong>Link Github:</strong> {user.links}
        </p>
        <p>
          <strong>Work Preference:</strong> {user.workPreference}
        </p>
        <p>
          <strong>Available From:</strong> {user.availableFrom}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Relocation:</strong> {user.relocation}
        </p>
        <p>
          <strong>About Me:</strong> {user.coverLetter}
        </p>
        <div className="mt-12">
          {" "}
          <a
            href={user.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200"
          >
            <em>Here you can see candidates CV</em>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompUserDetailPage;
