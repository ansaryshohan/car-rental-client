import InputField from "../Login&Register/InputField";

const CarInfoInputs = ({
  carDetailsInputError,
  carDetailsInput,
  handleCarDetailsInputOnChange,
}) => {
  const fuelTypes = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
    { value: "cng", label: "CNG" },
    { value: "lpg", label: "LPG" },
    { value: "hydrogen", label: "Hydrogen" },
  ];
  const transmissionTypes = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "cvt", label: "CVT" },
    { value: "semi-automatic", label: "Semi-Automatic" },
    { value: "dct", label: "DCT" },
    { value: "tiptronic", label: "Tiptronic" },
    { value: "amt", label: "AMT" },
    { value: "ev", label: "Electric" },
  ];
  return (
    <>
      {/* carInfo fieldset */}
      <div className="space-y-1 text-sm">
        <fieldset className="fieldset w-full  border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-white text-base">
            Car Info
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {/* engine info */}
            <InputField
              label={"Engine"}
              error={carDetailsInputError.engineError}
              customClassName="text-white"
              requiredStar={true}
            >
              <input
                type="text"
                name="engine"
                id="engine"
                defaultValue={carDetailsInput?.carInfo?.engine}
                onChange={handleCarDetailsInputOnChange}
                placeholder="2.5L 4C"
                className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
                required
              />
            </InputField>
            {/* fuel Info */}
            <InputField
              label={"Fuel"}
              customClassName="text-white"
              error={carDetailsInputError.fuelError}
              requiredStar={true}
            >
              <select
                name="fuel"
                id="fuel"
                defaultValue={carDetailsInput?.carInfo?.fuel}
                onChange={handleCarDetailsInputOnChange}
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-violet-600 outline-0 bg-gray-50"
                required
              >
                <option value="" disabled>
                  Select a fuel type
                </option>
                {fuelTypes.map((fuel) => (
                  <option key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </option>
                ))}
              </select>
            </InputField>
            {/* mileage info */}
            <InputField label={"Mileage"} customClassName="text-white">
              <input
                type="text"
                name="mileage"
                id="mileage"
                defaultValue={carDetailsInput?.carInfo?.mileage}
                onChange={handleCarDetailsInputOnChange}
                placeholder="30 MPG"
                className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
              />
            </InputField>
            {/* transmission Info */}
            <InputField label={"Transmission"} customClassName="text-white">
              <select
                name="transmission"
                id="transmission"
                defaultValue={carDetailsInput?.carInfo?.transmission}
                onChange={handleCarDetailsInputOnChange}
                className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-violet-600 outline-0 bg-gray-50"
              >
                <option value="" disabled>
                  Select a transmission type
                </option>
                {transmissionTypes.map((transmission) => (
                  <option key={transmission.value} value={transmission.value}>
                    {transmission.label}
                  </option>
                ))}
              </select>
            </InputField>
            {/* doors info */}
            <InputField
              label={"Car Doors"}
              error={carDetailsInputError.doorsError}
              customClassName="text-white"
              requiredStar={true}
            >
              <input
                type="number"
                name="doors"
                id="doors"
                defaultValue={carDetailsInput?.carInfo?.doors}
                onChange={handleCarDetailsInputOnChange}
                placeholder="4/2"
                className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
                required
              />
            </InputField>
            {/* passenger info */}
            <InputField
              label={"Passenger Info"}
              customClassName="text-white"
              error={carDetailsInputError.passengerError}
              requiredStar={true}
            >
              <input
                type="number"
                name="passenger"
                id="passenger"
                defaultValue={carDetailsInput?.carInfo?.passenger}
                onChange={handleCarDetailsInputOnChange}
                placeholder="4/5/6"
                className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
                required
              />
            </InputField>
          </div>
        </fieldset>
      </div>
      {/* car features div */}
      <div className="space-y-1 text-sm">
        <InputField
          label={"Car features"}
          customClassName="text-white"
          error={carDetailsInputError.featuresError}
          requiredStar={true}
        >
          <textarea
            type="text"
            name="features"
            id="features"
            defaultValue={carDetailsInput?.features.join(",")}
            onChange={handleCarDetailsInputOnChange}
            placeholder="Leather Interior, Bluetooth Support, Changing Support, Wider space"
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0 resize-none"
            required
          />
        </InputField>
      </div>
      <p className="text-sm font-medium py-3 text-primary-orange">
        {" "}
        <sup>*</sup> marked field are required{" "}
      </p>
    </>
  );
};

export default CarInfoInputs;
