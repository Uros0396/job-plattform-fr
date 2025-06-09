"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Controller } from "react-hook-form";

type FormData = {
  technology: { value: string; label: string } | null;
};

const technologyOptions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "CSS", label: "CSS" },
  { value: "HTML", label: "HTML" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
];

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
    control,
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

    { label: "Link Github", name: "links", type: "text" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmitInternal)}
      className="bg-gray-100 shadow-lg rounded-lg p-6 mt-4 space-y-4 w-130 ms-10"
      encType="multipart/form-data"
    >
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
            className={`w-120 p-2  bg-white border rounded ${
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
          className="block w-80 mt-1 border"
        />
      </div>

      <div>
        <label htmlFor="cv">CV File</label>
        <input
          {...register("cv")}
          type="file"
          id="cv"
          disabled={!isEditing}
          className="block w-80 border mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="workPreference">Work Preference</label>
        <select
          {...register("workPreference")}
          id="workPreference"
          disabled={!isEditing}
          className="w-80 p-2 border rounded"
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
      <div>
        <label className="block font-medium">Technologies</label>
        <Controller
          control={control}
          name="technologies"
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={technologyOptions}
              className="w-120"
              isDisabled={!isEditing}
              placeholder="Select technologies..."
              onChange={(selected) =>
                field.onChange(selected.map((opt) => opt.value))
              }
              value={technologyOptions.filter((opt) =>
                field.value?.includes(opt.value)
              )}
            />
          )}
        />
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
