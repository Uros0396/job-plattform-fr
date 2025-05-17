"use client";

interface CompanyFormProps {
  formData: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  submitButtonText: string;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  formData,
  onChange,
  onSubmit,
  title,
  submitButtonText,
}) => {
  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Address", name: "address", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "City", name: "city", type: "text" },
    { label: "Country", name: "country", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone Number", name: "phoneNumber", type: "text" },
    { label: "Website", name: "website", type: "text" },
    {
      label: "Company Size",
      name: "companySize",
      type: "select",
      options: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    { label: "Logo URL", name: "logo", type: "text" },
    { label: "Links (comma-separated)", name: "links", type: "text" },
  ];

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg shadow-lg mt-4 p-6"
      >
        {fields.map(({ label, name, type, options }) => (
          <div className="mb-4" key={name}>
            <label
              htmlFor={name}
              className="block text-lg font-medium text-gray-700"
            >
              {label}
            </label>

            {type === "select" && options ? (
              <select
                id={name}
                name={name}
                value={formData[name] || ""}
                onChange={onChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select company size</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[name] || ""}
                onChange={onChange}
                required={name !== "password"}
                minLength={type === "text" ? 2 : undefined}
              />
            )}
          </div>
        ))}

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

export default CompanyForm;
