"use client";

import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store/store";
import { getCompanyData } from "../../../reducer/getDataCompany";
import Link from "next/link";

interface CompanyList {
  _id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  website: string;
  companySize: string;
  logo: string;
  links: string;
  subscriptionPlan: string;
  stripeCustomerId: string;
}

const CompanyPersonalPage: React.FC = () => {
  const router = useRouter();
  const formData = router.query.formData as CompanyList | undefined;
  const [company, setCompany] = useState<CompanyList | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [editCompany, setEditCompany] = useState<CompanyList | null>(null);

  const allCompanies = useSelector(
    (state: RootState) => state.dataCompanySlice.data as CompanyList[]
  );
  const dataCompanyLoading = useSelector(
    (state: RootState) => state.dataCompanySlice.loading
  );
  const dataCompanyError = useSelector(
    (state: RootState) => state.dataCompanySlice.error
  );

  useEffect(() => {
    dispatch(getCompanyData());
  }, [dispatch]);

  useEffect(() => {
    if (formData) {
      setCompany(formData);
      setEditCompany(formData);
    } else {
      const companyId = localStorage.getItem("companyId");
      if (companyId && allCompanies.length > 0) {
        const loggedCompany =
          allCompanies.find((c) => c._id === companyId) || null;
        setCompany(loggedCompany);
        setEditCompany(loggedCompany);
      }
    }
  }, [allCompanies, formData]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditCompany((prevState) =>
      prevState ? { ...prevState, [name]: value } : null
    );
  };

  const handleUpdateCompany = async () => {
    if (editCompany) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/companies/updateAll/${editCompany._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editCompany),
          }
        );

        if (response.ok) {
          setCompany(editCompany);
          alert("Company information successfully updated");
        } else {
          throw new Error("Failed to update");
        }
      } catch (error) {
        console.error("Error updating company information:", error);
        alert("Failed to update user information");
      }
    }
  };

  if (dataCompanyLoading || !company) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (dataCompanyError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-red-500">Error: {dataCompanyError}</p>
      </div>
    );
  }

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "Country", name: "country", type: "text" },
    { label: "PhoneNumber", name: "phoneNumber", type: "text" },
    { label: "Website", name: "website", type: "text" },
    {
      label: "CompanySize",
      name: "companySize",
      type: "select",
      options: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    { label: "Logo", name: "logo", type: "text" },
    { label: "Links", name: "links", type: "text" },
  ];

  return (
    <>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Company Page</h1>
        <div className="row">
          <div className="col">
            <form className="card p-6 shadow-lg space-y-6">
              {fields.map(({ label, name, type, options }) => (
                <div className="mb-4" key={name}>
                  <label className="block text-lg font-medium mb-2">
                    {label}
                  </label>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={
                        editCompany
                          ? editCompany[name as keyof CompanyList]
                          : ""
                      }
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    >
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
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      value={
                        editCompany
                          ? editCompany[name as keyof CompanyList]
                          : ""
                      }
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleUpdateCompany}
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Update Company
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center mt-6">
        <Link href="/CompanyDashboard">
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default CompanyPersonalPage;
