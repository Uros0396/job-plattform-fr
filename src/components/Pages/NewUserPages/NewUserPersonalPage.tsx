import Navbar from "@/components/Navbar/Navbar";
import UpdatePersonalPage from "../UserPersonalPage/UserPersonalPage";
import Footer from "@/components/Footer/Footer";

const NewUserPersonalPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <UpdatePersonalPage />
      <Footer />
    </>
  );
};

export default NewUserPersonalPage;
