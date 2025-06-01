"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { getCompanyData } from "../../../reducer/getDataCompany";

import CompanyForm from "../../CompanyForm/CompanyForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CompanyPersonalPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [editedCompany, setEditedCompany] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const allCompanies = useSelector((state: RootState) => state.dataSlice.data);
  const dataLoading = useSelector(
    (state: RootState) => state.dataSlice.loading
  );
  const dataError = useSelector((state: RootState) => state.dataSlice.error);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/me`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Non autenticato");
        }
        const data = await res.json();

        if (!data.company) {
          throw new Error("Non sei una company");
        }

        setEditedCompany(data.company);

        dispatch(getCompanyData());
      })
      .catch(() => {
        router.push("/login-route");
      });
  }, [dispatch, router]);

  useEffect(() => {
    const storedData = localStorage.getItem("registeredCompanyData");
    if (storedData) {
      setEditedCompany(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId && allCompanies.length > 0 && !editedCompany) {
      const companyFromRedux = allCompanies.find(
        (u: any) => u._id === companyId
      );
      if (companyFromRedux) {
        setEditedCompany(companyFromRedux);
      }
    }
  }, [allCompanies, editedCompany]);

  const handleSubmit = async (data: any) => {
    if (!editedCompany) return;

    const updatedCompany = {
      ...editedCompany,
      ...data,
      links: data.links
        .split(",")
        .map((link: string) => link.trim())
        .filter(Boolean),
    };

    if (
      !updatedCompany.password ||
      updatedCompany.password?.trim() === "" ||
      updatedCompany.password.startsWith("$2b$")
    )
      delete updatedCompany.password;

    if (Array.isArray(updatedCompany.companySize)) {
      updatedCompany.companySize = updatedCompany.companySize.join("");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/companies/updatePortion/${editedCompany._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedCompany),
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
          credentials: "include",
        }
      );

      if (updatedCompanyResponse.ok) {
        const freshCompany = await updatedCompanyResponse.json();
        setEditedCompany(freshCompany);

        console.log("Updated company saved to localStorage:", freshCompany);
      }

      dispatch(getCompanyData());
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating", error);
      alert("Error updating company information");
    }
  };

  if (dataLoading || !editedCompany)
    return <p className="text-center">Loading...</p>;
  if (dataError)
    return <p className="text-center text-red-500">Error: {dataError}</p>;

  return (
    <div className="flex container mx-auto p-2 gap-6 mb-10 mt-10">
      {!isEditing && (
        <div className="w-1/3 grid max-h-80">
          <Link
            href="/company-dashboard"
            className="flex justify-center bg-blue-200 hover:bg-blue-100 border-2 rounded border-blue-300 max-h-25"
          >
            <button className="text-blue-500 cursor-pointer">
              <strong>Dashboard</strong>
            </button>
          </Link>
          <button
            className="text-blue-600 font-semibold border border-blue-300 rounded hover:bg-blue-100 text-center cursor-pointer max-h-25"
            onClick={() => setIsEditing(true)}
          >
            Here you can modify your profile
          </button>
        </div>
      )}

      <div className="w-2/3 bg-gray-100">
        <CompanyForm
          onSubmit={handleSubmit}
          title={isEditing ? "Update Profile" : "Your Profile"}
          submitButtonText="Update Profile"
          isEditing={isEditing}
          defaultValues={editedCompany}
        />
      </div>

      {isEditing && (
        <div>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            or Back to your profile
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyPersonalPage;
