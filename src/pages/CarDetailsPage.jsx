import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

import LeftSideCard from "../components/carDetailsComp/LeftSideCard";
import PageHeader from "../components/shared/PageHeader";
import RightSideCard from "../components/carDetailsComp/RightSideCard";

const CarDetailsPage = () => {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["singleCar", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_backend}caravan/cars/${id}`
      );
      return res?.data?.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="">
      {/* <Title title={"Add-Car | Caravan"} /> */}

      <div
        className="relative w-full min-h-screen pb-10 pt-[17vh]"
        style={{
          background:
            "linear-gradient(to right, #ab9d90 0%,#d6c9c0 22%,#d6c9c0 80%,#d6c9c0 80%,#ab9d90 100%)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative w-full h-full md:w-11/12 top-0 left-[50%] translate-x-[-50%] z-10 text-white ">
          <PageHeader titleText={data?.carModel} />
          {/* all the cars section with pagination component */}
          <div className="w-full mx-auto pt-8 pb-10 px-10 bg-black flex flex-col md:flex-row justify-between gap-6 items-start">
            {/* left side card */}
            <LeftSideCard carData={data} />
            {/* right side details section */}
            <RightSideCard  carData={data}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
