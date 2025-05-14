import CompanyHomeSection from "@/components/CompanyHomeSection/CompanyHomeSection";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navbar from "../../Navbar/Navbar";
import UserHomeSection from "@/components/UserHomeSection/UserHomeSection";

const Homepage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Header />
      <main className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="w-full md:w-1/2 p-4">
            <UserHomeSection />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <CompanyHomeSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Homepage;
