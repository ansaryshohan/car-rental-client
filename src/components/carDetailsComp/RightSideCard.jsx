import lockIcon from "../../assets/lock-100.png";
import speedometerIcon from "../../assets/speedometer-100.png";

import { FaDiamondTurnRight } from "react-icons/fa6";
import { GiBeveledStar } from "react-icons/gi";

const RightSideCard = ({carData}) => {
  const { _id,carModel, imageUrl,description, features } = carData;
  return (
    <div className="w-full md:flex-1">
      {/* car image */}
      <div className="w-full">
        <img
          src={imageUrl}
          alt={carModel}
          className="rounded-2xl w-full object-center object-cover"
        />
      </div>
      {/* info div */}
      <div className="flex items-center justify-between gap-6 w-full rounded-2xl border p-4 mt-6">
        <div className="flex items-center justify-around gap-2">
          <img src={speedometerIcon} alt="icon" className="w-14" />
          <div>
            <h3 className="font-bold text-base">Go Extra</h3>
            <p className="text-sm font-normal text-dull-text">
              We make your travel extra pleasant
            </p>
          </div>
        </div>

        <div className="flex items-center justify-around gap-2">
          <img src={lockIcon} alt="icon" className="w-14" />
          <div>
            <h3 className="font-bold text-base">Travel Safe</h3>
            <p className="text-sm font-normal text-dull-text">
              Your safety is out first priority
            </p>
          </div>
        </div>
      </div>
      {/* general info div */}
      <div className="py-10 px-6">
        <h3 className="flex items-center gap-2 text-primary-orange font-semibold tracking-wide leading-7">
          <span>
            <GiBeveledStar color="#ff3600" size={12} />
          </span>{" "}
          General Information
        </h3>
        <h3 className="text-3xl font-bold tracking-wide leading-8">
          Know About Our Car
        </h3>
        <p className="text-base font-medium text-dull-text leading-8 py-3">
          {description}
        </p>

        <div>
          <h3 className="flex items-center gap-2 text-lg text-white font-semibold tracking-wide leading-7">
            <span>
              <FaDiamondTurnRight color="#ff3600" size={16} />{" "}
            </span>
            24/7 Roadside Assistance
          </h3>
          <h3 className="flex items-center gap-2 text-lg text-white font-semibold tracking-wide leading-7">
            <span>
              <FaDiamondTurnRight color="#ff3600" size={16} />{" "}
            </span>
            Free Cancellation & Return
          </h3>
          <h3 className="flex items-center gap-2 text-lg text-white font-semibold tracking-wide leading-7">
            <span>
              <FaDiamondTurnRight color="#ff3600" size={16} />
            </span>{" "}
            Rent Now Pay When You Arrive
          </h3>
        </div>
      </div>
      <div className="divider"></div>

      {/* features section */}
      <div className="py-10 px-6">
        <h3 className="flex items-center gap-2 text-primary-orange font-semibold tracking-wide leading-7">
          <span>
            <GiBeveledStar color="#ff3600" size={12} />
          </span>{" "}
          Features
        </h3>
        <h3 className="text-3xl font-bold tracking-wide leading-8 mb-6">
          Premium amenities and features
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {features?.map((feature, i) => (
            <h3
              className="flex items-center gap-2 text-lg text-white font-semibold tracking-wide leading-7"
              key={i}
            >
              <span>
                <FaDiamondTurnRight color="#ff3600" size={16} />{" "}
              </span>
              {feature}
            </h3>
          ))}
        </div>
      </div>
      {/* book now button */}
      <div className=" w-full bottom-12  flex items-center justify-center">
        <button className="px-12 py-3 rounded-4xl border border-primary-orange bg-transparent text-primary-orange text-lg font-bold hover:bg-primary-orange hover:text-white hover:transition-all hover:duration-500 hover:scale-x-[85%]">
          {" "}
          Rent The Car
        </button>
      </div>
    </div>
  );
};

export default RightSideCard;
