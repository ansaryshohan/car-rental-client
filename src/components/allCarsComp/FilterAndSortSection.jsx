import { IoSearch } from "react-icons/io5";

const FilterAndSortSection = () => {
  return (
    <div className="w-full mx-auto pb-5 px-6 bg-gray-background flex justify-between gap-16 items-stretch">
      {/* filter and search input div */}
      <div className="px-4 py-2 rounded-4xl bg-white text-black flex-1">
        <form className="flex w-full rounded-4xl">
          {/* car name input  */}
          <div className=" rounded-box grid  grow place-items-center">
            <input
              type="text"
              name=""
              id=""
              className="w-full pl-4 py-2 outline-0 border-0 text-gray-background text-base font-medium bg-white"
              placeholder="Car Name"
            />
          </div>
          <div className="divider divider-horizontal "></div>
          {/* car category select input */}
          <div className=" rounded-box grid  grow place-items-center mr-3">
            <select
              name=""
              id=""
              className="w-full px-2 py-2 outline-0 border-0 text-black text-base font-medium bg-white"
              placeholder="Car Category"
              defaultValue={""}
            >
              <option value="" disabled>
                Choose Car Category
              </option>
              <option value="">luxury</option>
            </select>
          </div>
          {/* search button */}
          <div className=" rounded-box grid  grow place-items-center">
            <button
              type="submit"
              className="w-full bg-primary-orange text-white px-3 py-2 rounded-3xl text-center font-medium flex items-center justify-center gap-3"
            >
              Search <IoSearch color="#ffffff" size={20} />
            </button>
          </div>
        </form>
      </div>
      {/* sort by input div */}
      <div className="flex items-center justify-center gap-2 bg-white text-black px-5 py-2 rounded-4xl">
        <p className="text-sm font-semibold text-primary-orange">sort by :</p>
        <select
          name="genre"
          id="genre"
          defaultValue={""}
          className="bg-black text-sm text-white"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="price_asc">Price Ascending</option>
          <option value="price_asc">Price Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterAndSortSection;
