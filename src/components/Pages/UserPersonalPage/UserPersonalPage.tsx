"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { getData } from "../../../reducer/getDataUser";
import UserForm from "../../UserForm/UserForm";

const UpdatePersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedUser, setEditedUser] = useState<any>(null);

  const allUsers = useSelector((state: RootState) => state.dataSlice.data);
  const dataLoading = useSelector(
    (state: RootState) => state.dataSlice.loading
  );
  const dataError = useSelector((state: RootState) => state.dataSlice.error);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    const registeredUserData = localStorage.getItem("registeredUserData");

    if (registeredUserData) {
      const parsedData = JSON.parse(registeredUserData);
      setEditedUser(parsedData);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && allUsers.length > 0) {
      const userFromRedux = allUsers.find((u: any) => u._id === userId);
      if (userFromRedux) {
        setEditedUser(userFromRedux);
        localStorage.setItem(
          "registeredUserData",
          JSON.stringify(userFromRedux)
        );
      }
    }
  }, [allUsers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev: any) => ({
      ...prev,
      [name]:
        name === "technologies"
          ? value.split(",").map((tech) => tech.trim())
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedUser) return;

    const userToUpdate = { ...editedUser };
    if (userToUpdate.password === "") delete userToUpdate.password;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/updatePortion/${editedUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userToUpdate),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update user information"
        );
      }

      alert("User information updated successfully!");

      const updatedUserResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/${editedUser._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedUserResponse.ok) {
        const updatedUser = await updatedUserResponse.json();
        setEditedUser(updatedUser);
        localStorage.setItem("registeredUserData", JSON.stringify(updatedUser));
      }

      dispatch(getData());
    } catch (error) {
      console.error("Error updating user", error);
      alert("Error updating user information");
    }
  };

  if (dataLoading || !editedUser)
    return <p className="text-center">Loading...</p>;
  if (dataError)
    return <p className="text-center text-red-500">Error: {dataError}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Your Profile
      </h2>
      <UserForm
        formData={editedUser}
        onChange={handleChange}
        onSubmit={handleSubmit}
        title="Update User Personal Page"
        submitButtonText="Update Profile"
      />
    </div>
  );
};

export default UpdatePersonalPage;
