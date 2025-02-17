import DatePicker from "react-datepicker";
import InputField from "../Login&Register/InputField";

const CarDetailsInputs = ({
  carDetailsInputError,
  carDetailsInput,
  setCarDetailsInput,
  handleCarDetailsInputOnChange,
}) => {
  const carTypes = [
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "hatchback", label: "Hatchback" },
    { value: "coupe", label: "Coupe" },
    { value: "convertible", label: "Convertible" },
    { value: "pickup", label: "Pickup Truck" },
    { value: "minivan", label: "Minivan" },
    { value: "crossover", label: "Crossover" },
    { value: "sports", label: "Sports Car" },
    { value: "luxury", label: "Luxury Car" },
    { value: "electric", label: "Electric Vehicle (EV)" },
    { value: "hybrid", label: "Hybrid" },
    { value: "wagon", label: "Wagon" },
    { value: "van", label: "Van" },
    { value: "offroad", label: "Off-Road Vehicle" },
    { value: "classic", label: "Classic/Vintage Cars" },
    { value: "supercar", label: "Supercar/Hypercar" },
    { value: "compact", label: "Compact Car" },
    { value: "midsize", label: "Mid-Size Car" },
    { value: "fullsize", label: "Full-Size Car" },
  ];
  const renderYearContent = (year) => {
    // console.log(year)
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  return (
    <>
      {/* car model name, category,release year */}
      <div className="space-y-1 text-sm flex flex-col md:flex-row md:justify-around md:items-center gap-6">
        <div className=" w-full md:w-1/3">
          <InputField
            label={"Car Model Name"}
            error={carDetailsInputError.carModelError}
            customClassName="text-white"
            requiredStar={true}
          >
            <input
              type="text"
              name="carModel"
              id="carModel"
              defaultValue={carDetailsInput.carModel}
              onChange={handleCarDetailsInputOnChange}
              placeholder="Car Model Name"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
              required
            />
          </InputField>
        </div>
        <div className="flex justify-center items-center gap-6 w-full md:w-2/3">
          {/* car category */}
          <InputField
            label={"Car Category"}
            customClassName="text-white"
            error={carDetailsInputError.carModelError}
            requiredStar={true}
          >
            <select
              name="carType"
              id="carType"
              defaultValue={carDetailsInput.carType}
              onChange={handleCarDetailsInputOnChange}
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-violet-600 outline-0 bg-gray-50"
              required
            >
              <option value="" disabled>
                Select a car type
              </option>
              {carTypes.map((carType) => (
                <option key={carType.value} value={carType.value}>
                  {carType.label}
                </option>
              ))}
            </select>
          </InputField>
          {/* car release year */}
          <InputField label={"Release Year"} customClassName="text-white">
            <DatePicker
              selected={carDetailsInput.year}
              renderYearContent={renderYearContent}
              showYearPicker
              defaultValue={carDetailsInput.year}
              onChange={(date) =>
                setCarDetailsInput({
                  ...carDetailsInput,
                  year: date,
                })
              }
              dateFormat="yyyy"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800  bg-gray-50 outline-0"
            />
          </InputField>
        </div>
      </div>
      {/* car image div */}
      <div className="space-y-1 text-sm">
        <InputField
          label={"Car Image"}
          error={carDetailsInputError.imageError}
          customClassName="text-white"
          requiredStar={true}
        >
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleCarDetailsInputOnChange}
            placeholder="Car image"
            accept="image/*"
            className="file-input w-full rounded-md border-gray-300 bg-gray-50 outline-0 text-gray-600"
            required
          />
        </InputField>
        {carDetailsInput.imageName && (
          <p className="text-gray-200 mt-1 pl-3">
            Selected File: {carDetailsInput.imageName}
          </p>
        )}
      </div>
      {/* car description div */}
      <div className="space-y-1 text-sm">
        <InputField
          label={"Car description"}
          error={carDetailsInputError.descriptionError}
          customClassName="text-white"
          requiredStar={true}
        >
          <textarea
            type="text"
            name="description"
            id="description"
            defaultValue={carDetailsInput.description}
            onChange={handleCarDetailsInputOnChange}
            placeholder="Car description"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0 resize-none"
            required
          />
        </InputField>
      </div>
      {/* Car location, registration no, rental price div */}
      <div className="space-y-1 text-sm flex flex-col lg:flex-row justify-center lg:items-center lg:justify-stretch lg:gap-5">
        <InputField
          label={"Daily Rental Price:"}
          error={carDetailsInputError.dailyRentalPriceError}
          customClassName="text-white"
          requiredStar={true}
        >
          <input
            type="number"
            name="dailyRentalPrice"
            id="dailyRentalPrice"
            defaultValue={carDetailsInput.dailyRentalPrice}
            onChange={handleCarDetailsInputOnChange}
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
            placeholder="50 "
            required
          />
        </InputField>
        <InputField
          label={"Car Registration Number:"}
          error={carDetailsInputError.vehicleRegistrationNumberError}
          customClassName="text-white"
          requiredStar={true}
        >
          <input
            type="text"
            name="vehicleRegistrationNumber"
            id="vehicleRegistrationNumber"
            defaultValue={carDetailsInput.vehicleRegistrationNumber}
            onChange={handleCarDetailsInputOnChange}
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
            placeholder="Registration No"
            required
          />
        </InputField>
        <InputField
          label={"Car Location:"}
          error={carDetailsInputError.locationError}
          customClassName="text-white"
          requiredStar={true}
        >
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={carDetailsInput.location}
            onChange={handleCarDetailsInputOnChange}
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
            placeholder="Car Location"
            required
          />
        </InputField>
      </div>
      <p className="text-sm font-medium py-3 text-primary-orange/90 flex items-center">
        {" "}
        <sup className="text-primary-orange mr-2 tracking-wide">( * )</sup>{" "}
        marked fields are required{" "}
      </p>
    </>
  );
};

export default CarDetailsInputs;
