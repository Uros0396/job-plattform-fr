"use client";

import Link from "next/link";

const UserHomepageSection: React.FC = () => {
  const redirectToGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/google`;
  };

  return (
    <div className="lg:w-1/2 bg-green-500 flex flex-col justify-evenly items-center p-8 text-center rounded-lg shadow-lg">
      <h2 className="text-4xl text-red-600 font-bold mb-4">Candidate</h2>
      <p className="text-lg text-gray-800 mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fugit, a
        rem aspernatur est dolor voluptate laudantium nulla! Sed molestiae
        maiores amet repellat vero delectus, nobis debitis ipsam veritatis
        voluptates fuga non nihil aliquid quos qui cumque accusamus temporibus?
        Alias voluptates reprehenderit ratione non voluptate soluta fugiat
        maiores repellat porro.
      </p>

      <Link href="/RegisterFormUser">
        <button className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Register
        </button>
      </Link>

      <button
        type="button"
        onClick={redirectToGoogle}
        className="w-full py-2 mt-4 bg-white text-blue-500 rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default UserHomepageSection;
