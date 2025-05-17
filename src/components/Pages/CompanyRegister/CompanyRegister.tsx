"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyForm from "../../CompmanyForm/CompanyForm";

interface CompanyData {
  name: string;
  address: string;
  password: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
  website: string;
  companySize: string;
  logo: string;
  links: string;
  subscriptionPlan: string;
  stripeCustomerId: string;
}

const CompanyRegister: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<CompanyData>({
    name: "",
    address: "",
    password: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
    website: "",
    companySize: "",
    logo: "",
    links: "",
    subscriptionPlan: "651e18c5f2a9a3d4e8b0a123",
    stripeCustomerId: "trialing",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/companies/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
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
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      title="Register Company"
      submitButtonText="Register"
    />
  );
};

export default CompanyRegister;
