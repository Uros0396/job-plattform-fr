import Footer from "@/components/Footer/Footer";
import CompanyPersonalPage from "../CompanyPersona/CompanyPersonalPage";
import Navbar from "@/components/Navbar/Navbar";

const NewCompanyPersPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <CompanyPersonalPage />
      </main>
      <Footer />
    </div>
  );
};

export default NewCompanyPersPage;
