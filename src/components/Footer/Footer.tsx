import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-100 text-white p-4">
      <div className="container mx-auto grid grid-cols-8 gap-2">
        <div className="col-span-2 border-e border-blue-300">
          <Link href={"/"}>
            {" "}
            <img
              src="/assets/ChatGPT_Image_17_mag_2025__16_21_28-removebg-preview.png"
              alt="img"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="col-span-3 space-y-4 text-gray-600 p-4 border-e border-blue-300">
          <p>
            <small>
              <a href="#">Contattaci</a>
            </small>
          </p>
          <p>
            <small>
              <a href="#">Chi Siamo</a>
            </small>
          </p>
          <p>
            <small>
              <a href="#">Servizi</a>
            </small>
          </p>
          <p>
            <small>
              <a href="#">FAQ</a>
            </small>
          </p>
        </div>
        <div className="col-span-3 p-4 gap-6 text-blue-500 flex">
          <Instagram className="cursor-pointer" />

          <Facebook className="cursor-pointer" />
          <Linkedin className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
