"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginCard {
  email: string;
  password: string;
}

const LoginUserOrCompany: React.FC = () => {
  const [formData, setFormData] = useState<LoginCard>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.clear();
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("registeredUserData", JSON.stringify(data.user));
          router.push("/user-personal-page");
        } else if (data.company) {
          localStorage.setItem("companyId", data.company._id);
          localStorage.setItem(
            "registeredCompanyData",
            JSON.stringify(data.company)
          );
          router.push("/company-personal-page");
        }
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto bg-black shadow-md rounded-md p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          value={formData.email}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={handleInput}
          value={formData.password}
          required
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-2">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default LoginUserOrCompany;
