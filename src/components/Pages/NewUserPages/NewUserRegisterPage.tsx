import Navbar from "@/components/Navbar/Navbar";
import RegisterFormUser from "../UseRegister/UserRegister";
import Footer from "@/components/Footer/Footer";

const NewUserRegisterPage: React.FC = () => {
  return (
    <>
      <RegisterFormUser />
      <Footer />
    </>
  );
};

export default NewUserRegisterPage;
