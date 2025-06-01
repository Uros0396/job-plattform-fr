"use client";

import { useRouter } from "next/navigation";
import CompanyForm from "../../CompanyForm/CompanyForm";

const CompanyRegister: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/companies/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Company registered successfully. Please log in.");
        router.push("/login-route");
      } else {
        alert("Failed to register company");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  return (
    <CompanyForm
      onSubmit={handleSubmit}
      title="Register Company"
      submitButtonText="Register"
      isEditing={true}
    />
  );
};

export default CompanyRegister;
