"use client";

{
  /*"use client";

import { FC } from "react";

interface UserFormProps {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  submitButtonText: string;
}

const UserForm: FC<UserFormProps> = ({
  formData,
  onChange,
  onSubmit,
  title,
  submitButtonText,
}) => {
  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Address", name: "address", type: "text" },
    { label: "Image URL", name: "img", type: "text" },
    { label: "CV URL", name: "cv", type: "text" },
    { label: "Cover Letter", name: "coverLetter", type: "text" },
    { label: "Available From", name: "availableFrom", type: "date" },
    { label: "Relocation", name: "relocation", type: "text" },
  ];

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg shadow-lg mt-4 p-6"
      >
        {fields.map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={
                type === "date" && formData[name]
                  ? new Date(formData[name]).toISOString().split("T")[0]
                  : formData[name] || ""
              }
              onChange={onChange}
              required={
                name !== "img" && name !== "cv" && name !== "coverLetter"
              }
              minLength={type === "text" ? 2 : undefined}
            />
          </div>
        ))}

      
        <div className="mb-4">
          <label
            htmlFor="technologies"
            className="block text-lg font-medium text-gray-700"
          >
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.technologies?.join(", ") || ""}
            onChange={onChange}
          />
        </div>

        
        <div className="mb-4">
          <label
            htmlFor="workPreference"
            className="block text-lg font-medium text-gray-700"
          >
            Work Preference
          </label>
          <select
            id="workPreference"
            name="workPreference"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.workPreference || "remote"}
            onChange={onChange}
          >
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default UserForm;*/
}

import { FC } from "react";

interface UserFormProps {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  submitButtonText: string;
}

const UserForm: FC<UserFormProps> = ({
  formData,
  onChange,
  onSubmit,
  title,
  submitButtonText,
}) => {
  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Address", name: "address", type: "text" },
    { label: "Profile Image", name: "img", type: "file" },
    { label: "CV File", name: "cv", type: "file" },
    { label: "Cover Letter", name: "coverLetter", type: "text" },
    { label: "Available From", name: "availableFrom", type: "date" },
    { label: "Relocation", name: "relocation", type: "text" },
  ];

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg shadow-lg mt-4 p-6"
        encType="multipart/form-data"
      >
        {fields.map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={
                type === "date" && formData[name]
                  ? new Date(formData[name]).toISOString().split("T")[0]
                  : type === "file"
                  ? undefined
                  : formData[name] || ""
              }
              onChange={onChange}
              required={
                name !== "img" && name !== "cv" && name !== "coverLetter"
              }
              minLength={type === "text" ? 2 : undefined}
            />
          </div>
        ))}

        {/* Technologies Field */}
        <div className="mb-4">
          <label
            htmlFor="technologies"
            className="block text-lg font-medium text-gray-700"
          >
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.technologies?.join(", ") || ""}
            onChange={onChange}
          />
        </div>

        {/* Work Preference Field */}
        <div className="mb-4">
          <label
            htmlFor="workPreference"
            className="block text-lg font-medium text-gray-700"
          >
            Work Preference
          </label>
          <select
            id="workPreference"
            name="workPreference"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.workPreference || "remote"}
            onChange={onChange}
          >
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
