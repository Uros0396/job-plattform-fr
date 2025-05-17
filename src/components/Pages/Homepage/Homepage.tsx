import CompanyHomeSection from "@/components/CompanyHomeSection/CompanyHomeSection";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Navbar from "../../Navbar/Navbar";
import UserHomeSection from "@/components/UserHomeSection/UserHomeSection";
import ArrowSection from "@/components/ArrowSection/ArrowSection";

const Homepage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header />
      <ArrowSection />
      <main className="flex-1 w-full m-0 p-0 mb-30">
        <div className="flex">
          <UserHomeSection />
          <CompanyHomeSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
