"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(2, "Address is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(5, "Phone number is required"),
  website: z.string().url("Invalid URL"),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"], {
    errorMap: () => ({ message: "Please select a company size" }),
  }),
  logo: z.string().url("Invalid URL"),
  links: z.string().optional(),
});

type CompanyFormSchema = z.infer<typeof schema>;

interface CompanyFormProps {
  title: string;
  submitButtonText: string;
  isEditing?: boolean;
  onSubmit: (data: CompanyFormSchema) => void;
  defaultValues?: Partial<CompanyFormSchema>;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  title,
  submitButtonText,
  isEditing = true,
  onSubmit,
  defaultValues = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <div className="container mx-auto mt-6 px-4 p-4">
      <h2 className="text-2xl font-semibold text-blue-500">{title}</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-lg mt-4 p-4 bg-blue-100"
      >
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Address", name: "address", type: "text" },
          { label: "Password", name: "password", type: "password" },
          { label: "City", name: "city", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone Number", name: "phoneNumber", type: "text" },
          { label: "Website", name: "website", type: "text" },
          { label: "Logo URL", name: "logo", type: "text" },
          { label: "Links (comma-separated)", name: "links", type: "text" },
        ].map(({ label, name, type }) => {
          if (name === "password" && !isEditing) return null;

          return (
            <div key={name} className="mb-4">
              <label
                htmlFor={name}
                className="block text-lg font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                {...register(name as keyof CompanyFormSchema)}
                type={type}
                id={name}
                placeholder={`Enter ${label.toLowerCase()}`}
                className={`mt-2 p-2 w-full ${
                  errors[name as keyof typeof errors]
                    ? "border-red-500 ring-red-300"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                readOnly={!isEditing}
              />
              {errors[name as keyof typeof errors] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name as keyof typeof errors]?.message?.toString()}
                </p>
              )}
            </div>
          );
        })}

        {/* Select: Company Size */}
        <div className="mb-4">
          <label
            htmlFor="companySize"
            className="block text-lg font-medium text-gray-700"
          >
            Company Size
          </label>
          <select
            {...register("companySize")}
            className={`mt-2 p-2 w-full  ${
              errors.companySize
                ? "border-red-500 ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            disabled={!isEditing}
          >
            <option value="">Select company size</option>
            {["1-10", "11-50", "51-200", "201-500", "500+"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.companySize && (
            <p className="text-red-500 text-sm mt-1">
              {errors.companySize.message}
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

export default CompanyForm;
