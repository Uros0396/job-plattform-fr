import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import CompanyDashboard from "./CompanyDashboard";

const NewCompanyDashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <CompanyDashboard />
      <Footer />
    </>
  );
};

export default NewCompanyDashboard;
