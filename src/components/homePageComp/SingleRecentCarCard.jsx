import { Link } from "react-router-dom";
import doorIcon from "../../assets/car-door-icon.png";
import mileageIcon from "../../assets/car-mileage-icon.png";
import fuelIcon from "../../assets/fuel-icon.png";
import passengerIcon from "../../assets/passenger-icon.png";

const SingleRecentCarCard = ({ singleCar }) => {
  const {
    _id,
    carModel,
    carType,
    year,
    dailyRentalPrice,
    availability,
    imageUrl,
    carInfo: { engine, fuel, mileage, transmission, passenger, doors },
    dateAdded,
    addedBy,
    location,
  } = singleCar;

  // year formatting for year
  const fullDate = new Date(year);
  const formattedYear = fullDate.getFullYear();
  
  // date formatting for dateAdded
  const dateObj = new Date(dateAdded);
  const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}-${dateObj.getFullYear()}`;

  return (
    <div className="bg-black rounded-3xl pb-4">
      {/* card image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={carModel}
          className="w-full h-48 object-cover object-center rounded-t-3xl"
        />
        <p className="absolute w-full px-3 bottom-2 left-1 text-white text-base font-medium bg-gradient-to-r from-black/60 to-black/0">
          <span className="text-2xl font-bold">${dailyRentalPrice}</span>/per
          day
        </p>
      </div>
      {/* car name and info */}
      <div className=" w-10/12 mx-auto py-4 px-2 border-b border-dashed border-dull-text/70 mb-2">
        <h3 className="text-xl font-semibold hover:text-primary-orange hover:duration-500 mb-1">
          <Link to={`/cars/${_id}`}>{carModel}</Link>
        </h3>
        <p className="text-sm text-dull-text flex items-center gap-1">
          <span>{carType}</span>{" "}
          <span className="flex items-center justify-center text-center">
            .
          </span>{" "}
          {formattedYear}
        </p>
      </div>
      {/* car info of milage,fuel */}
      <div className=" w-10/12 mx-auto py-4  border-b border-dashed border-dull-text/70 mb-2 flex items-stretch justify-between gap-2">
        <div
          className="flex flex-col items-center justify-between gap-1"
          title={"Mileage"}
        >
          <img src={mileageIcon} alt="mileage" className="w-9/12" />
          <p className="text-xs font-medium">{mileage}</p>
        </div>
        <div
          className="flex flex-col items-center justify-between gap-1"
          title="Fuel"
        >
          <img src={fuelIcon} alt="mileage" className="w-9/12" />
          <p className="text-xs font-medium">{fuel}</p>
        </div>
        <div
          className="flex flex-col items-center justify-between gap-1"
          title="Doors"
        >
          <img src={doorIcon} alt="mileage" className="w-7/12" />
          <p className="text-sm font-medium">{doors}</p>
        </div>
        <div
          className="flex flex-col items-center justify-between gap-1"
          title="Passengers"
        >
          <img src={passengerIcon} alt="mileage" className="w-9/12" />
          <p className="text-sm font-medium">{passenger}</p>
        </div>
      </div>
      {/* user info */}
      <div className="w-10/12 mx-auto py-4 mb-2 flex items-stretch justify-between gap-2 text-dull-text text-xs">
        <p>
          City:{" "}
          <span className="font-medium text-white">
            {location.split(",")[0]}
          </span>
        </p>
        <p>
          Agent: <span className="font-medium text-white">{addedBy?.name}</span>
        </p>
        <p>
          Added: <span>{formattedDate}</span>
        </p>
      </div>
    </div>
  );
};

export default SingleRecentCarCard;
