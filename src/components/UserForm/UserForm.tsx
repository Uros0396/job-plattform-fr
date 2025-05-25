/*"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  surname: z.string().min(2, "Surname is required"),
  dob: z.string().min(1, "Date of birth is required"),
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  address: z.string().min(2, "Address is required"),
  img:
    typeof window !== "undefined"
      ? z
          .instanceof(FileList)
          .optional()
          .refine(
            (files) => !files || files.length === 0 || files[0]?.size > 0,
            "Profile Image is required"
          )
      : z.any(),
  cv:
    typeof window !== "undefined"
      ? z
          .instanceof(FileList)
          .optional()
          .refine(
            (files) => !files || files.length === 0 || files[0]?.size > 0,
            "CV File is required"
          )
      : z.any(),

  coverLetter: z.string().optional(),
  availableFrom: z.string().min(1, "Available From is required"),
  relocation: z.string().optional(),
  technologies: z.string().optional(),
  links: z.string().optional(),
  workPreference: z.enum(["remote", "on-site", "hybrid"], {
    errorMap: () => ({ message: "Please select a work preference" }),
  }),
});

export type UserFormSchema = z.infer<typeof schema>;

interface UserFormProps {
  title: string;
  submitButtonText: string;
  isEditing?: boolean;
  defaultValues?: Partial<UserFormSchema>;
  onSubmit: (data: UserFormSchema & { imgFile?: File; cvFile?: File }) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  title,
  submitButtonText,
  isEditing = true,
  defaultValues = {},
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Address", name: "address", type: "text" },
    { label: "Cover Letter", name: "coverLetter", type: "text" },
    { label: "Available From", name: "availableFrom", type: "date" },
    { label: "Relocation", name: "relocation", type: "text" },
    {
      label: "Technologies (comma-separated)",
      name: "technologies",
      type: "text",
    },
  ];

  const fileFields = [
    { label: "Profile Image", name: "img" },
    { label: "CV File", name: "cv" },
  ];

  const onSubmitInternal = (data: UserFormSchema) => {
    const imgFile = data.img && data.img.length > 0 ? data.img[0] : undefined;
    const cvFile = data.cv && data.cv.length > 0 ? data.cv[0] : undefined;

    onSubmit({ ...data, imgFile, cvFile });
  };

  return (
    <div className="container mx-auto mt-6 px-4 p-4">
      <h2 className="text-2xl font-semibold text-blue-500">{title}</h2>

      <form
        onSubmit={handleSubmit(onSubmitInternal)}
        className="bg-white rounded-lg shadow-lg mt-4 p-6 bg-blue-100"
        encType="multipart/form-data"
      >
        {fields.map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              {...register(name as keyof UserFormSchema)}
              type={type}
              id={name}
              placeholder={`Enter ${label.toLowerCase()}`}
              className={`mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                errors[name as keyof typeof errors]
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={!isEditing}
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof typeof errors]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        {fileFields.map(({ label, name }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              {...register(name as keyof UserFormSchema)}
              type="file"
              id={name}
              className={`mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                errors[name as keyof typeof errors]
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={!isEditing}
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof typeof errors]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        <div className="mb-4">
          <label
            htmlFor="workPreference"
            className="block text-lg font-medium text-gray-700"
          >
            Work Preference
          </label>
          <select
            {...register("workPreference")}
            id="workPreference"
            className={`mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
              errors.workPreference
                ? "border-red-500 ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={!isEditing}
          >
            <option value="">Select work preference</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors.workPreference && (
            <p className="text-red-500 text-sm mt-1">
              {errors.workPreference.message}
            </p>
          )}
        </div>

        {isEditing && (
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {submitButtonText}
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;*/

"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  surname: z.string().min(2, "Surname is required"),
  dob: z.string().min(1, "Date of birth is required"),
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")), // Permette anche password vuota (non aggiornata)
  address: z.string().min(2, "Address is required"),
  img:
    typeof window !== "undefined"
      ? z
          .instanceof(FileList)
          .optional()
          .refine(
            (files) => !files || files.length === 0 || files[0]?.size > 0,
            "Profile Image is required"
          )
      : z.any(),
  cv:
    typeof window !== "undefined"
      ? z
          .instanceof(FileList)
          .optional()
          .refine(
            (files) => !files || files.length === 0 || files[0]?.size > 0,
            "CV File is required"
          )
      : z.any(),
  coverLetter: z.string().optional(),
  availableFrom: z.string().min(1, "Available From is required"),
  relocation: z.string().optional(),
  technologies: z.array(z.string()).optional(),

  links: z.string().optional(),
  workPreference: z.enum(["remote", "on-site", "hybrid"], {
    errorMap: () => ({ message: "Please select a work preference" }),
  }),
});

export type UserFormSchema = z.infer<typeof schema>;

interface UserFormProps {
  title: string;
  submitButtonText: string;
  isEditing?: boolean;
  defaultValues?: Partial<UserFormSchema>;
  onSubmit: (data: UserFormSchema & { imgFile?: File; cvFile?: File }) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  title,
  submitButtonText,
  isEditing = true,
  defaultValues = {},
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Address", name: "address", type: "text" },
    { label: "Cover Letter", name: "coverLetter", type: "text" },
    { label: "Available From", name: "availableFrom", type: "date" },
    { label: "Relocation", name: "relocation", type: "text" },
    {
      label: "Technologies (comma-separated)",
      name: "technologies",
      type: "text",
    },
    {
      label: "Links (comma-separated)",
      name: "links",
      type: "text",
    },
  ];

  const fileFields = [
    { label: "Profile Image", name: "img" },
    { label: "CV File", name: "cv" },
  ];

  const onSubmitInternal = (data: UserFormSchema) => {
    const imgFile = data.img && data.img.length > 0 ? data.img[0] : undefined;
    const cvFile = data.cv && data.cv.length > 0 ? data.cv[0] : undefined;

    onSubmit({ ...data, imgFile, cvFile });
  };

  return (
    <div className="container mx-auto mt-6 px-4 p-4">
      <h2 className="text-2xl font-semibold text-blue-500">{title}</h2>

      <form
        onSubmit={handleSubmit(onSubmitInternal)}
        className="bg-white rounded-lg shadow-lg mt-4 p-6 bg-blue-100"
        encType="multipart/form-data"
      >
        {fields.map(({ label, name, type }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              {...register(name as keyof UserFormSchema)}
              type={type}
              id={name}
              placeholder={`Enter ${label.toLowerCase()}`}
              className={`mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                errors[name as keyof typeof errors]
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={!isEditing}
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof typeof errors]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        {fileFields.map(({ label, name }) => (
          <div key={name} className="mb-4">
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              {...register(name as keyof UserFormSchema)}
              type="file"
              id={name}
              className={`mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                errors[name as keyof typeof errors]
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={!isEditing}
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[name as keyof typeof errors]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        <div className="mb-4">
          <label
            htmlFor="workPreference"
            className="block text-lg font-medium text-gray-700"
          >
            Work Preference
          </label>
          <select
            {...register("workPreference")}
            id="workPreference"
            className={`mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
              errors.workPreference
                ? "border-red-500 ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={!isEditing}
            defaultValue={defaultValues.workPreference || ""}
          >
            <option value="" disabled>
              Select a work preference
            </option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors.workPreference && (
            <p className="text-red-500 text-sm mt-1">
              {errors.workPreference.message}
            </p>
          )}
        </div>

        {isEditing && (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
          >
            {submitButtonText}
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
