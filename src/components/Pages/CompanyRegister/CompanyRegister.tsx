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
        }
      );

      if (response.ok) {
        const createdCompany = await response.json();
        alert("Company registered successfully. Please log in.");

        localStorage.clear();
        localStorage.setItem("companyId", createdCompany._id);
        localStorage.setItem(
          "registeredUserData",
          JSON.stringify(createdCompany)
        );

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
