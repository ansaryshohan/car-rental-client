import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AllCars from "../components/allCarsComp/AllCars";
import FilterAndSortSection from "../components/allCarsComp/FilterAndSortSection";
import Pagination from "../components/allCarsComp/Pagination";
import PageHeader from "../components/shared/PageHeader";
import Title from "../components/shared/Title";

const AllCarsPage = () => {
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [priceSort, setPriceSort] = useState("");
  const [filterDataSearch, setFilterDataSearch] = useState({
    search: "",
    carType: "",
  });

  const { isPending, error, data, refetch } = useQuery({
    queryKey: [
      "recentCars",
      currentPageNo,
      priceSort,
      filterDataSearch.carType,
      filterDataSearch.search,
    ],
    queryFn: async ({ queryKey }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_backend}caravan/cars/available-cars?pageNo=${
          queryKey[1]
        }&perPageData=${9}&priceSort=${priceSort}&carType=${
          filterDataSearch.carType
        }&searchText=${filterDataSearch.search}`
      );
      return res.data?.data;
    },
  });
  // console.log(filterDataSearch)

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const totalPageNumber = Math.ceil(Number(data?.totalNoOfCars) / 9);

  return (
    <div className="">
      <Title title={"All-Car | Caravan"} />

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
          <FilterAndSortSection
            priceSort={priceSort}
            setPriceSort={setPriceSort}
            filterDataSearch={filterDataSearch}
            setFilterDataSearch={setFilterDataSearch}
          />
          {/* all the cars section with pagination component */}
          <div className="w-full mx-auto pt-8 pb-10 px-6 bg-gray-background">
            <AllCars isPending={isPending} error={error} data={data} />
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
