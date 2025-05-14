"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface RegisterCompanyCard {
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

const RegisterCompany = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterCompanyCard>({
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

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "City", name: "city", type: "text" },
    { label: "Country", name: "country", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phoneNumber", type: "text" },
    { label: "Website", name: "website", type: "text" },
    {
      label: "Company Size",
      name: "companySize",
      type: "select",
      options: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    { label: "Logo URL", name: "logo", type: "text" },
    { label: "Links (comma-separated)", name: "links", type: "text" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/companies/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Company registered successfully");
        localStorage.setItem("companyData", JSON.stringify(formData));

        router.push("/CompanyPersonalPage");

        setFormData({
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
          subscriptionPlan: "",
          stripeCustomerId: "",
        });
      } else {
        alert("Failed to register company");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Register Company</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        {fields.map(({ label, name, type, options }) => (
          <div key={name} className="flex flex-col">
            <label className="mb-1 font-semibold">{label}</label>
            {type === "select" ? (
              <select
                name={name}
                value={formData[name as keyof RegisterCompanyCard]}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Size</option>
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                className="border border-gray-300 rounded px-3 py-2"
                value={formData[name as keyof RegisterCompanyCard]}
                onChange={handleChange}
                required={
                  name === "name" ||
                  name === "email" ||
                  name === "password" ||
                  name === "city" ||
                  name === "country" ||
                  name === "phoneNumber" ||
                  name === "companySize"
                }
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;
