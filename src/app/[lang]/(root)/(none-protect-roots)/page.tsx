import Landing from "@/components/pages/Landing";
import { getLandingData } from "@/services/static-pages/landing";

const Home = async () => {
  const data = await getLandingData();

  return (
    <div className="w-full">
      <Landing data={data} />
    </div>
  );
};

export default Home;
