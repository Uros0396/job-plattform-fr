"use client";

import { useRouter } from "next/navigation";
import UserForm, { UserFormSchema } from "../../UserForm/UserForm";

const RegisterFormUser: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    data: UserFormSchema & { imgFile?: File; cvFile?: File }
  ) => {
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/create`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const createdUser = await response.json();
        alert("Candidate registered successfully. Please log in.");
        localStorage.clear();
        localStorage.setItem("registeredUserData", JSON.stringify(createdUser));
        localStorage.setItem("userId", createdUser._id);
        router.push("/login-route");
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  return (
    <UserForm
      title="Register Candidate"
      submitButtonText="Register"
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterFormUser;
