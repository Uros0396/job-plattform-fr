"use client";

import Link from "next/link";

const CompanyHomeSection: React.FC = () => {
  return (
    <div className="lg:w-1/2 bg-yellow-400 flex flex-col justify-evenly items-center p-8">
      <h2 className="text-red-600 text-2xl font-bold mb-4">Company</h2>
      <p className="text-center text-gray-800 mb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt earum,
        pariatur minus natus, tempore alias, vero quasi hic quisquam ad dicta ea
        quod? Pariatur id veniam debitis officiis aperiam molestiae odit
        provident labore? Exercitationem explicabo cupiditate excepturi, beatae
        dolore necessitatibus error quaerat nostrum vel omnis asperiores nobis
        laudantium molestiae dolores.
      </p>
      <Link href="/RegisterFormCompany">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </Link>
    </div>
  );
};

export default CompanyHomeSection;
