import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SectionHeader from "../shared/SectionHeader";
import SingleRecentCarCard from "./SingleRecentCarCard";
import { Link } from "react-router-dom";

const RecentCarSection = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["recentCars"],
    queryFn: async () => {
      const res = await axios.get("/carData.json");
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-gray-background text-white py-16">
      <SectionHeader
        colorTitle={"cars"}
        title={"Recent"}
        subHeading={"Explore Our Latest Arrivals Find Your Perfect Ride Today!"}
      />

      {/* recent cars cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 w-11/12 mx-auto ">
        {data.slice(0, 6).map((singleCarData) => (
          <SingleRecentCarCard
            key={singleCarData._id}
            singleCar={singleCarData}
          />
        ))}
      </div>
      {/* view all cars button */}
      <div className="pt-4 pb-3 w-full flex items-center justify-center">
        <Link to={"/cars"}>
        <button className="px-12 py-3 rounded-4xl border border-primary-orange bg-primary-orange text-white text-lg font-bold hover:bg-primary-orange hover:text-white hover:transition-all hover:duration-500 hover:scale-x-[85%]">
          {" "}
          View More
        </button>
        </Link>
      </div>
    </div>
  );
};

export default RecentCarSection;
