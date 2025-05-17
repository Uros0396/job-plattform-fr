import Image from "next/image";

const Header: React.FC = () => {
  return (
    <div className="text-blue-500 w-full">
      <div className="flex flex-col items-center justify-center p-10">
        <Image
          src="/assets/ChatGPT_Image_17_mag_2025__16_21_28-removebg-preview.png"
          alt="img"
          width={490}
          height={390}
        />

        <p className="max-w-2xl p-20 text-center text-base leading-relaxed mt-5 border-b border-blue-100">
          Our platform was created to connect new talent with companies looking
          for fresh, motivated individuals ready to grow in the tech industry.
          We provide a space designed to make it easier for emerging
          professionals to meet employers who value potential and enthusiasm.
        </p>

        <p className="max-w-2xl p-20 text-center text-base leading-relaxed border-b border-blue-100">
          For candidates, it's an opportunity to stand out by creating a
          complete profile and presenting their skills, experiences, and
          technologies directly to companies. It's the ideal place to kick-start
          a real career in the digital world.
        </p>
        <p className="max-w-2xl p-20 text-center text-base leading-relaxed">
          For companies, the platform enables targeted searches for junior and
          entry-level profiles, with filters based on technologies,
          availability, and work preferences. It's a simple, fast, and effective
          way to find new talent and build the future of your team.
        </p>
      </div>
    </div>
  );
};

export default Header;
