import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AllCars from "../components/allCarsComp/AllCars";
import FilterAndSortSection from "../components/allCarsComp/FilterAndSortSection";
import Pagination from "../components/allCarsComp/Pagination";
import PageHeader from "../components/shared/PageHeader";

const AllCarsPage = () => {
  const [currentPageNo, setCurrentPageNo] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: ["recentCars",currentPageNo],
    queryFn: async ({queryKey}) => {
      const res = await axios.get(`${import.meta.env.VITE_backend}caravan/cars/available-cars?pageNo=${queryKey[1]}&perPageData=${9}`);
      return res.data?.data;
    },
  });

  const totalPageNumber = Math.ceil(Number(data?.totalNoOfCars)/ 9);


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
          <PageHeader titleText={"ALL Cars"} />
          {/* filter  inputs divs */}
          <FilterAndSortSection />
          {/* all the cars section with pagination component */}
          <div className="w-full mx-auto pt-8 pb-10 px-6 bg-gray-background">
            <AllCars isPending={isPending} error={error} data={data?.allCars} />
            <div>
            <Pagination
              currentPageNo={currentPageNo}
              setCurrentPageNo={setCurrentPageNo}
              totalPageNumber={totalPageNumber}
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCarsPage;
