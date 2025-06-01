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
  password: z.string().optional().or(z.literal("")),
  address: z.string().min(2, "Address is required"),
  img:
    typeof window !== "undefined" ? z.instanceof(FileList).optional() : z.any(),
  cv:
    typeof window !== "undefined" ? z.instanceof(FileList).optional() : z.any(),
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
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmitInternal = (data: UserFormSchema) => {
    const imgFile = data.img?.[0];
    const cvFile = data.cv?.[0];

    onSubmit({ ...data, imgFile, cvFile });
  };

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
    { label: "Links (comma-separated)", name: "links", type: "text" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmitInternal)}
      className="bg-white shadow-lg rounded-lg p-6 mt-4 space-y-4"
      encType="multipart/form-data"
    >
      <h3 className="text-xl font-bold">{title}</h3>

      {fields.map(({ label, name, type }) => (
        <div key={name}>
          <label htmlFor={name} className="block font-medium">
            {label}
          </label>
          <input
            {...register(name as keyof UserFormSchema)}
            type={type}
            id={name}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              errors[name as keyof typeof errors]
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errors[name as keyof typeof errors] && (
            <p className="text-red-500 text-sm">
              {errors[name as keyof typeof errors]?.message?.toString()}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="img">Profile Image</label>
        <input
          {...register("img")}
          type="file"
          id="img"
          disabled={!isEditing}
          className="block w-full mt-1"
        />
      </div>

      <div>
        <label htmlFor="cv">CV File</label>
        <input
          {...register("cv")}
          type="file"
          id="cv"
          disabled={!isEditing}
          className="block w-full mt-1"
        />
      </div>

      <div>
        <label htmlFor="workPreference">Work Preference</label>
        <select
          {...register("workPreference")}
          id="workPreference"
          disabled={!isEditing}
          className="w-full p-2 border rounded"
        >
          <option value="">Select preference</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-site</option>
          <option value="hybrid">Hybrid</option>
        </select>
        {errors.workPreference && (
          <p className="text-red-500 text-sm">
            {errors.workPreference.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isEditing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default UserForm;
