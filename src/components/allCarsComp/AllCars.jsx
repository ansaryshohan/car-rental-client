import SingleRecentCarCard from "../homePageComp/SingleRecentCarCard";
import LoadingSpinner from "../shared/LoadingSpinner";

const AllCars = ({ isPending, error, data }) => {
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 w-11/12 mx-auto ">
      {isPending ? (
        <LoadingSpinner />
      ) : data?.allCars?.length > 0 ? (
        data?.allCars.map((singleCarData) => (
          <SingleRecentCarCard
            key={singleCarData._id}
            singleCar={singleCarData}
          />
        ))
      ) : (
        <div className="w-10/12 mx-auto h-full flex justify-center items-center py-16">
          {" "}
          <h3 className="text-2xl font-bold text-red-600 text-center">
            No cars found
          </h3>{" "}
        </div>
      )}
    </div>
  );
};

export default AllCars;
