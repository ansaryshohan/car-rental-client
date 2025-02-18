import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import doorIcon from "../../assets/car-door-icon.png";
import mileageIcon from "../../assets/car-mileage-icon.png";
import engineIcon from "../../assets/engine-icon.png";
import fuelIcon from "../../assets/fuel-icon.png";
import passengerIcon from "../../assets/passenger-icon.png";
import transmissionIcon from "../../assets/transmission-icon.png";
import { RiArrowRightUpFill } from "react-icons/ri";

const LeftSideCard = ({ carData }) => {
  const {
    _id,
    carModel,
    carType,
    year,
    dailyRentalPrice,
    availability,
    carInfo: { engine, fuel, mileage, transmission, passenger, doors },
    dateAdded,
    addedBy,
    location,
  } = carData;
  // year formatting for year
  const fullDate = new Date(year);
  const formattedYear = fullDate.getFullYear();

  // date formatting for dateAdded
  const dateObj = new Date(dateAdded);
  const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}-${dateObj.getFullYear()}`;

  return (
    <div className="w-full md:w-4/12 sticky top-24">
      <div className="bg-gray-background rounded-3xl pb-4 py-6">
        {/* car rental price */}
        <div className="w-10/12 mx-auto py-4 px-2">
          <p className=" w-full text-white text-2xl font-medium ">
            <span className="text-2xl font-bold">${dailyRentalPrice}</span>
            /per day
          </p>
        </div>
        {/* car name and info */}
        <div className=" w-10/12 mx-auto py-4 px-4 border-b border-dashed border-dull-text/70 mb-2">
          <h3 className="text-xl font-semibold mb-1">{carModel}</h3>
          <p className="text-sm text-dull-text flex items-center gap-1">
            <span>{carType}</span> <sup className="px-2">.</sup> {formattedYear}
          </p>
          {/* book now button */}
          <div className="w-full flex items-center justify-start pt-4">
            <Link className="hover:transition-all hover:duration-500 hover:scale-x-[95%] flex items-center gap-0.5">
              <button className="px-5 py-2 rounded-4xl border border-primary-orange  text-base font-bold bg-primary-orange text-white ">
                {" "}
                Rent The Car
              </button>
              <button className="px-2 py-2 rounded-full border border-primary-orange  text-base font-bold bg-primary-orange text-white text-center">
                <RiArrowRightUpFill size={20} color="#ffffff" />
              </button>
            </Link>
          </div>
        </div>

        {/* car info of milage,fuel */}
        <div className=" w-10/12 mx-auto py-4 px-4  border-b border-dashed border-dull-text/70 mb-2 flex flex-col items-stretch justify-between gap-2 space-y-3">
          <div
            className="flex  items-center justify-between gap-1"
            title={"Mileage"}
          >
            <div className="flex items-center gap-4">
              <img src={mileageIcon} alt="mileage" className="w-10" />
              <p>Mileage</p>
            </div>
            <p className="text-xs font-medium">{mileage}</p>
          </div>
          <div
            className="flex  items-center justify-between gap-1"
            title={"Engine"}
          >
            <div className="flex items-center gap-4">
              <img src={engineIcon} alt="mileage" className="w-10" />
              <p>Engine</p>
            </div>
            <p className="text-xs font-medium">{engine}</p>
          </div>
          <div
            className="flex  items-center justify-between gap-1"
            title={"Transmission"}
          >
            <div className="flex items-center gap-4">
              <img src={transmissionIcon} alt="mileage" className="w-10" />
              <p>Transmission</p>
            </div>
            <p className="text-xs font-medium">{transmission}</p>
          </div>
          <div className="flex items-center justify-between gap-1" title="Fuel">
            <div className="flex items-center gap-4">
              <img src={fuelIcon} alt="mileage" className="w-10" />
              <p>Fuel</p>
            </div>
            <p className="text-xs font-medium">{fuel}</p>
          </div>
          <div
            className="flex items-center justify-between gap-1"
            title="Doors"
          >
            <div className="flex items-center gap-4">
              <img src={doorIcon} alt="mileage" className="w-10" />
              <p>doors</p>
            </div>
            <p className="text-sm font-medium">{doors}</p>
          </div>
          <div
            className="flex items-center justify-between gap-1"
            title="Passengers"
          >
            <div className="flex items-center gap-4">
              <img src={passengerIcon} alt="mileage" className="w-10" />
              <p>Passengers</p>
            </div>

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
            Agent:{" "}
            <span className="font-medium text-white">{addedBy?.name}</span>
          </p>
          <p>
            Added: <span>{formattedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideCard;
