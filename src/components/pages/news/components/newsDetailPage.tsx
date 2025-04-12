import Footer from "@/components/pages/Landing/layout/Footer";

import Navbar from "../../Landing/layout/Navbar";
import SidesDetailsPages from "./sidesDetailPages";

const NewsDetailPage = ({
  newsId,
  newsPageData,
}: {
  newsId: string;
  newsPageData: any;
}) => {
  return (
    <div className="w-full h-auto flex flex-col bg-gradient-to-tr from-[#4c3488] duration-300 justify-center text-white relative">
      <div>
        <Navbar />
      </div>
      <SidesDetailsPages news={newsPageData} />

      <div className="mt-10 md:mt-0">
        <Footer />
      </div>
    </div>
  );
};

export default NewsDetailPage;
