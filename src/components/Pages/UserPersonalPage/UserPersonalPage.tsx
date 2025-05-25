/*"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { getData } from "../../../reducer/getDataUser";
import UserForm, { UserFormSchema } from "../../UserForm/UserForm";

const UserPersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedUser, setEditedUser] = useState<UserFormSchema | null>(null);

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

        const {
          _id,
          name,
          email,
          username,
          role,
          address,
          technologies,
          imgUrl,
          cvUrl,
        } = userFromRedux;

        const lightUser = {
          _id,
          name,
          email,
          username,
          role,
          address,
          technologies,
          imgUrl,
          cvUrl,
        };

        localStorage.setItem("registeredUserData", JSON.stringify(lightUser));
      }
    }
  }, [allUsers]);

  const handleSubmit = async (
    data: UserFormSchema & { imgFile?: File; cvFile?: File }
  ) => {
    if (!editedUser) return;

    const formDataToSend = new FormData();

    for (const key in data) {
      if (key === "imgFile" || key === "cvFile") continue;
      const value = data[key as keyof typeof data];
      if (typeof value === "string") {
        formDataToSend.append(key, value);
      } else if (Array.isArray(value)) {
        formDataToSend.append(key, value.join(","));
      }
    }

    if (data.imgFile) formDataToSend.append("img", data.imgFile);
    if (data.cvFile) formDataToSend.append("cv", data.cvFile);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/updatePortion/${editedUser._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
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

        const {
          _id,
          name,
          email,
          username,
          role,
          address,
          technologies,
          imgUrl,
          cvUrl,
        } = updatedUser;

        const lightUser = {
          _id,
          name,
          email,
          username,
          role,
          address,
          technologies,
          imgUrl,
          cvUrl,
        };

        localStorage.setItem("registeredUserData", JSON.stringify(lightUser));
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
        defaultValues={editedUser}
        onSubmit={handleSubmit}
        title="Update User Personal Page"
        submitButtonText="Update Profile"
      />
    </div>
  );
};

export default UserPersonalPage;*/
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getData } from "../../../reducer/getDataUser";
import UserForm, { UserFormSchema } from "../../UserForm/UserForm";
import { useRouter } from "next/navigation";

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

        // Trasforma links array in stringa separata da virgole per il form
        const userForForm: UserFormSchema = {
          ...data.user,
          links: Array.isArray(data.user.links)
            ? data.user.links.join(", ")
            : "",
          // Nota: assicurati che tutti i campi obbligatori siano presenti o gestiti qui
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

    // Prepara l'oggetto da inviare
    const updatedUser: any = {
      ...editedUser,
      ...data,
      links: data.links
        ?.split(",")
        .map((link) => link.trim())
        .filter(Boolean),
    };

    // Gestione password come nel Company: se password non modificata, la eliminiamo
    if (
      !updatedUser.password ||
      updatedUser.password.trim() === "" ||
      updatedUser.password.startsWith("$2b$")
    ) {
      delete updatedUser.password;
    }

    try {
      // Se hai file da inviare (imgFile o cvFile), serve multipart/form-data,
      // altrimenti JSON va bene. Qui esempio base con JSON:

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/updatePortion/${editedUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update user information"
        );
      }

      alert("User information updated successfully!");

      // Ricarichiamo i dati utente aggiornati
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
        };

        setEditedUser(userForForm);
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
        defaultValues={editedUser}
        onSubmit={handleSubmit}
        title="Update User Personal Page"
        submitButtonText="Update Profile"
      />
    </div>
  );
};

export default UserPersonalPage;
