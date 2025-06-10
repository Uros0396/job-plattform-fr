"use client";

import { useRouter } from "next/navigation";
import CompanyForm from "../../CompanyForm/CompanyForm";
import Image from "next/image";

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
    <>
      <div className="text-center">
        <div className="inline-block">
          <Image
            src="/assets/ChatGPT_Image_17_mag_2025__16_21_28-removebg-preview.png"
            alt="img"
            width={290}
            height={140}
          />
        </div>
      </div>

      <div className="text-center p-20 space-y-10 text-blue-400">
        <p>
          We're excited that your company is interested in connecting with a
          network of motivated and impactful talent.
        </p>
        <p>
          Before gaining access to all features reserved for companies, we
          kindly ask you to complete the registration by providing some basic
          information about your organization.
        </p>
        <p>
          Once submitted, our team will review your request to verify that
          you're an active and legitimate business entity.
        </p>
        <p>
          This verification step is essential to maintain the quality and trust
          within our community. You'll receive an email confirmation as soon as
          your registration is approved.
        </p>
      </div>
      <div className="max-w-xl mx-auto px-4 bg-gray-100 mb-10">
        {" "}
        <CompanyForm
          onSubmit={handleSubmit}
          title="Register Company"
          submitButtonText="Sign Up"
          isEditing={true}
        />
      </div>
    </>
  );
};

export default CompanyRegister;
