import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const FilterAndSortSection = ({
  priceSort,
  setPriceSort,
  filterDataSearch,
  setFilterDataSearch,
  handleSearchSubmit
}) => {
  const [dropdown, setDropdown] = useState(false);
  const {
    isPending: carTypeDataPending,
    error: carTypeDataError,
    data: carTypesData,
  } = useQuery({
    queryKey: ["carTypes"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_backend}caravan/cars/car-types`
      );
      return res.data?.data;
    },
  });
  const {
    isPending: carModelDataPending,
    error: carModelDataError,
    data: carModelDataAccordingSearch,
  } = useQuery({
    queryKey: ["carModels", filterDataSearch.search],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_backend}caravan/cars/search-cars?searchText=${
          filterDataSearch.search
        }`
      );
      return res.data?.data;
    },
  });

  const handleSearch = (carModelName) => {
    setFilterDataSearch((prev) => ({ ...prev, search: carModelName }));
    setDropdown(false);
  };

  const searchQueryShow = dropdown && carModelDataAccordingSearch?.length > 0;

  // console.log(carModelDataAccordingSearch, searchQueryShow, filterDataSearch);
  return (
    <div className="w-full mx-auto pb-5 px-6 bg-gray-background flex justify-between gap-16 items-stretch">
      {/* filter and search input div */}
      <div className="px-4 py-2 rounded-4xl bg-white text-black flex-1  relative border">
        <div className="flex w-full rounded-4xl">
          {/* car name input  */}
          <div className=" rounded-box grid  grow place-items-center">
            <input
              type="text"
              name="search"
              id="search"
              className="w-full pl-4 py-2 outline-0 border-0 text-gray-background text-base font-medium bg-white"
              placeholder="Car Name"
              value={filterDataSearch.search}
              onChange={(e) =>
                setFilterDataSearch((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              onClick={() => setDropdown(true)}
            />
            {searchQueryShow && (
              <ul className="absolute top-[105%] left-0 bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
                {carModelDataPending || carModelDataAccordingSearch?.map((carModel) => (
                  <li
                    key={carModel._id}
                    onClick={() => handleSearch(carModel.carModel)}
                  >
                    <p>{carModel.carModel}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="divider divider-horizontal"></div>
          {/* car category select input */}
          <div className=" rounded-box grid  grow place-items-center mr-3">
            <select
              name="carType"
              id="carType"
              className="w-full px-2 py-2 outline-0 border-0 text-black text-base font-medium bg-white"
              placeholder="Car Category"
              defaultValue={filterDataSearch.carType}
              onChange={(e) =>
                setFilterDataSearch((prev) => ({
                  ...prev,
                  carType: e.target.value,
                }))
              }
            >
              <option value="">Choose Car Category</option>
              {carTypeDataPending ||
                carTypesData.map((carType) => (
                  <option key={carType._id} value={carType.carType}>
                    {carType.carType}
                  </option>
                ))}
            </select>
          </div>
          {/* search button */}
          <div className=" rounded-box grid  grow place-items-center">
            <button
              className="w-full bg-primary-orange text-white px-3 py-2 rounded-3xl text-center font-medium flex items-center justify-center gap-3"
              onClick={handleSearchSubmit}
            >
              Search <IoSearch color="#ffffff" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* sort by input div */}
      <div className="flex items-center justify-center gap-2 bg-white text-black px-5 py-2 rounded-4xl">
        <p className="text-sm font-semibold text-primary-orange">sort by :</p>
        <select
          name="genre"
          id="genre"
          defaultValue={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="bg-black text-sm text-white"
        >
          <option value="">No filter Selected</option>
          <option value="price_asc">Price Ascending</option>
          <option value="price_dsc">Price Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSortSection;
