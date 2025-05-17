"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { getCompanyData } from "../../../reducer/getDataCompany";
import CompanyForm from "../../CompmanyForm/CompanyForm";
import Link from "next/link";

const CompanyPersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedCompany, setEditedCompany] = useState<any>(null);

  const allCompanies = useSelector((state: RootState) => state.dataSlice.data);
  const dataLoading = useSelector(
    (state: RootState) => state.dataSlice.loading
  );
  const dataError = useSelector((state: RootState) => state.dataSlice.error);

  useEffect(() => {
    dispatch(getCompanyData());
  }, [dispatch]);

  useEffect(() => {
    const registeredCompanyData = localStorage.getItem("registeredCompanyData");

    if (registeredCompanyData) {
      const parsedData = JSON.parse(registeredCompanyData);
      setEditedCompany(parsedData);
    }
  }, []);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId && allCompanies.length > 0) {
      const companyFromRedux = allCompanies.find(
        (u: any) => u._id === companyId
      );
      if (companyFromRedux) {
        setEditedCompany(companyFromRedux);
        localStorage.setItem(
          "registeredCompanyData",
          JSON.stringify(companyFromRedux)
        );
      }
    }
  }, [allCompanies]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedCompany((prev: any) => ({
      ...prev,
      [name]: name === "companySize" ? value.trim() : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedCompany) return;

    const companyToUpdate = { ...editedCompany };
    if (companyToUpdate.password === "") delete companyToUpdate.password;

    if (Array.isArray(companyToUpdate.companySize)) {
      companyToUpdate.companySize = companyToUpdate.companySize.join("");
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/companies/updatePortion/${editedCompany._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(companyToUpdate),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update company information"
        );
      }

      alert("Company information updated successfully!");

      const updatedCompanyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/companies/${editedCompany._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedCompanyResponse.ok) {
        const updatedCompany = await updatedCompanyResponse.json();
        setEditedCompany(updatedCompany);
        localStorage.setItem(
          "registeredCompanyData",
          JSON.stringify(updatedCompany)
        );
      }

      dispatch(getCompanyData());
    } catch (error) {
      console.error("Error updating ", error);
      alert("Error updating company information");
    }
  };

  if (dataLoading || !editedCompany)
    return <p className="text-center">Loading...</p>;
  if (dataError)
    return <p className="text-center text-red-500">Error: {dataError}</p>;

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Your Profile
        </h2>
        <CompanyForm
          formData={editedCompany}
          onChange={handleChange}
          onSubmit={handleSubmit}
          title="Update Company Personal Page"
          submitButtonText="Update Profile"
        />
      </div>
      <div className="container">
        <Link href={"company-dashboard"}>
          <button>Dashboard</button>
        </Link>
      </div>
    </>
  );
};

export default CompanyPersonalPage;
