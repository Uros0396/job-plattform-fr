"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "../../UserForm/UserForm";

interface FormData {
  name: string;
  surname: string;
  dob: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address: string;
  img: string;
  cv: string;
  coverLetter: string;
  technologies: string[];
  workPreference: string;
  availableFrom: string;
  relocation: string;
}

const RegisterFormUser: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    dob: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    address: "",
    img: "",
    cv: "",
    coverLetter: "",
    technologies: [],
    workPreference: "remote",
    availableFrom: "",
    relocation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "technologies"
          ? value.split(",").map((tech) => tech.trim())
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.VITE_SERVER_BASE_URL}/users/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const createdUser = await response.json();
        alert("Candidate registered successfully. Please log in.");

        localStorage.clear();
        localStorage.setItem("registeredUserData", JSON.stringify(createdUser));
        localStorage.setItem("userId", createdUser._id);

        router.push("/login"); // ✅ fixato
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
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      title="Register Candidate"
      submitButtonText="Register"
    />
  );
};

export default RegisterFormUser;
