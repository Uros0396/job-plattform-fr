"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getData } from "../../../reducer/getDataUser";
import UserForm, { UserFormSchema } from "../../UserForm/UserForm";
import { useRouter } from "next/navigation";
import GearLoader from "@/components/GearLoader/GearLoader";

const UserPersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [editedUser, setEditedUser] = useState<UserFormSchema | null>(null);

  const dataLoading = useSelector(
    (state: RootState) => state.dataSlice.loading
  );
  const dataError = useSelector((state: RootState) => state.dataSlice.error);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/me`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Non autenticato");
        const data = await res.json();

        if (!data.user) throw new Error("Non sei un utente");

        const userForForm: UserFormSchema = {
          ...data.user,
          links: Array.isArray(data.user.links)
            ? data.user.links.join(", ")
            : "",
          technologies: Array.isArray(data.user.technologies)
            ? data.user.technologies.join(", ")
            : "",
        };

        setEditedUser(userForForm);
        dispatch(getData());
      })
      .catch(() => {
        router.push("/login-route");
      });
  }, [dispatch, router]);

  const handleSubmit = async (
    data: UserFormSchema & { imgFile?: File; cvFile?: File }
  ) => {
    if (!editedUser) return;

    const formData = new FormData();

    Object.entries({
      ...editedUser,
      ...data,
      links: data.links?.split(",").map((l) => l.trim()),
    }).forEach(([key, value]) => {
      if (
        key !== "img" &&
        key !== "cv" &&
        key !== "imgFile" &&
        key !== "cvFile" &&
        value !== undefined &&
        value !== null
      )
        formData.append(key, value as string);
    });

    if (data.imgFile) formData.append("img", data.imgFile);
    if (data.cvFile) formData.append("cv", data.cvFile);

    if (
      !data.password ||
      data.password.trim() === "" ||
      data.password.startsWith("$2b$")
    ) {
      formData.delete("password");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/updatePortion/${editedUser._id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      alert("Profilo aggiornato con successo!");

      const updatedUserResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/me`,
        {
          credentials: "include",
        }
      );

      if (updatedUserResponse.ok) {
        const freshUser = await updatedUserResponse.json();
        const userForForm: UserFormSchema = {
          ...freshUser.user,
          links: Array.isArray(freshUser.user.links)
            ? freshUser.user.links.join(", ")
            : "",
          technologies: Array.isArray(freshUser.user.technologies)
            ? freshUser.user.technologies.join(", ")
            : "",
        };

        setEditedUser(userForForm);
      }

      dispatch(getData());
    } catch (error) {
      console.error("Errore aggiornamento", error);
      alert("Errore durante l'aggiornamento del profilo");
    }
  };

  if (dataLoading || !editedUser) return <GearLoader />;
  if (dataError)
    return <p className="text-red-500 text-center">Errore: {dataError}</p>;

  return (
    <div className="container mx-auto p-6">
      <UserForm
        defaultValues={editedUser}
        onSubmit={handleSubmit}
        title="Update User Personal Page"
        submitButtonText="Update Profile"
      />
      <p>Hera you can see your profile</p>
      {editedUser && (
        <button
          onClick={() => router.push(`/user-detail/${editedUser._id}`)}
          className="mt-4 bg-white text-gray-500 cursor-pointer"
        >
          Your Profile
        </button>
      )}
    </div>
  );
};

export default UserPersonalPage;
