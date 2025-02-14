import SingleRecentCarCard from "../homePageComp/SingleRecentCarCard";

const AllCars = ({ isPending, error, data }) => {
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-5 w-11/12 mx-auto ">
      {data.map((singleCarData) => (
        <SingleRecentCarCard
          key={singleCarData._id}
          singleCar={singleCarData}
        />
      ))}
    </div>
  );
};

export default AllCars;
