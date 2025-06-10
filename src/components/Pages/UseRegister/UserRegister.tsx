"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import UserForm, { UserFormSchema } from "../../UserForm/UserForm";
import Image from "next/image";

const RegisterFormUser: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    data: UserFormSchema & { imgFile?: File; cvFile?: File }
  ) => {
    const formDataToSend = new FormData();

    for (const key in data) {
      if (key === "imgFile" || key === "cvFile") continue;
      const value = data[key as keyof typeof data];
      if (typeof value === "string") {
        formDataToSend.append(key, value);
      } else if (Array.isArray(value)) {
        formDataToSend.append(key, value.join(","));
      }
    }

    if (data.imgFile) formDataToSend.append("img", data.imgFile);
    if (data.cvFile) formDataToSend.append("cv", data.cvFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/create`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        alert(
          "Failed to register user: " +
            (errorData.message || JSON.stringify(errorData))
        );
        return;
      }

      if (response.ok) {
        alert("Candidate registered successfully. Please log in.");
        router.push("/login-route");
      } else {
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Error submitting form");
    }
  };

  const memoizedDefaultValues = useMemo(() => {
    return {
      name: "",
      email: "",
    };
  }, []);

  return (
    <>
      <div className="container mx-auto text-center">
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
        <p className="p-10 border-b border-b-gray-200 mt-6 text-blue-400">
          Welcome! If you're a junior developer or just starting your journey in
          the world of coding, you're in the right place. <br /> Fill out the
          form to create your profile you’ll be able to showcase your skills,
          work preferences (remote, on-site, or hybrid), <br /> and start
          getting noticed by companies looking for new talent.
        </p>
      </div>
      <div className="flex gap-40 mt-20 mb-20">
        <UserForm
          title="Register Candidate"
          submitButtonText="Register"
          onSubmit={handleSubmit}
          defaultValues={memoizedDefaultValues}
        />
        <Image
          src="/assets/ChatGPT_Image_8_giu_2025__11_05_36-removebg-preview.png"
          alt="Image of a computer connected to a big house, representing the connection between candidates and companies"
          width={600}
          height={800}
        />
      </div>
    </>
  );
};

export default RegisterFormUser;
