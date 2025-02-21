import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axiosCredentialInstance from "../../axios/credentialAxios";
import { useAuthContext } from "../../hooks/useAuthContext";
import CarDetailsInputs from "./CarDetailsInputs";
import CarInfoInputs from "./CarInfoInputs";
import UserInfoInputs from "./UserInfoInputs";

const AddCarForm = ({ formStepNo, setFormStepNo, formHeadlineArray }) => {
  const { user } = useAuthContext();
  const [carDataUploadLoading, setCarDataUploadLoading] = useState(false);
  const [carDetailsInput, setCarDetailsInput] = useState({
    carModel: "",
    carType: "",
    year: new Date(),
    adminApproval: "pending",
    dailyRentalPrice: 0,
    availability: true,
    vehicleRegistrationNumber: "",
    features: [],
    description: "",
    bookingCount: 0,
    image: null,
    imageName: "",
    location: "",
    carInfo: {
      engine: "",
      fuel: "",
      mileage: "",
      transmission: "",
      doors: 0,
      passenger: 0,
    },
    addedBy: {
      userId: user?.uid,
      name: user?.displayName,
      email: user?.email,
    },
    dateAdded: new Date(),
    bookingStatus: "available",
  });

  const [carDetailsInputError, setCarDetailsInputError] = useState({
    carModelError: "",
    carTypeError: "",
    imageError: "",
    descriptionError: "",
    dailyRentalPriceError: "",
    vehicleRegistrationNumberError: "",
    locationError: "",
    engineError: "",
    fuelError: "",
    doorsError: "",
    passengerError: "",
    featuresError: "",
  });

  const handleFormContent = () => {
    switch (formStepNo) {
      case 0:
        return (
          <CarDetailsInputs
            handleCarDetailsInputOnChange={handleCarDetailsInputOnChange}
            carDetailsInput={carDetailsInput}
            carDetailsInputError={carDetailsInputError}
            setCarDetailsInput={setCarDetailsInput}
          />
        );
      case 1:
        return (
          <CarInfoInputs
            handleCarDetailsInputOnChange={handleCarDetailsInputOnChange}
            carDetailsInput={carDetailsInput}
            carDetailsInputError={carDetailsInputError}
          />
        );
      case 2:
        return <UserInfoInputs user={user} />;

      default:
        return (
          <CarDetailsInputs
            handleCarDetailsInputOnChange={handleCarDetailsInputOnChange}
            renderYearContent={renderYearContent}
            carDetailsInput={carDetailsInput}
            carDetailsInputError={carDetailsInputError}
          />
        );
    }
  };

  const handleCarDetailsInputOnChange = (e) => {
    // carModel error
    if (e.target.name === "carModel") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        carModelError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: e.target.value,
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        carModelError: "Provide Car Model Name",
      });
    }
    // carType error
    if (e.target.name === "carType") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        carTypeError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: e.target.value,
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        carModelError: "select a car Model",
      });
    }
    // image error
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setCarDetailsInputError({
        ...carDetailsInputError,
        imageError: "",
      });
      setCarDetailsInput({ ...carDetailsInput, image: null, imageName: "" });
      // Check if no file is selected
      if (!file) {
        setCarDetailsInputError({
          ...carDetailsInputError,
          imageError: "Please select a file.",
        });
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setCarDetailsInputError({
          ...carDetailsInputError,
          imageError: "Please upload a valid image file (JPEG, PNG, etc.).",
        });
        return;
      }

      // Validate file size (e.g., 5MB limit)
      const maxSize = 1 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setCarDetailsInputError({
          ...carDetailsInputError,
          imageError: "File size must be less than 1MB.",
        });
        return;
      }
      // Validate file extension
      const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setCarDetailsInputError({
          ...carDetailsInputError,
          imageError: "Only JPG, JPEG, PNG, and webp files are allowed.",
        });
        return;
      }

      return setCarDetailsInput({
        ...carDetailsInput,
        [e.target.name]: file,
        imageName: file ? file.name : "",
      });
    }
    // car description error
    if (e.target.name === "description") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        descriptionError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: e.target.value,
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        descriptionError: "Provide Car details",
      });
    }
    // car dailyRentalPrice error
    if (e.target.name === "dailyRentalPrice") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        dailyRentalPriceError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: Number(e.target.value),
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        dailyRentalPriceError: "Provide daily rental price",
      });
    }
    // car vehicleRegistrationNumber error
    if (e.target.name === "vehicleRegistrationNumber") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        vehicleRegistrationNumberError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: e.target.value,
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        vehicleRegistrationNumberError: "Provide registration no of the car",
      });
    }
    // car location error
    if (e.target.name === "location") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        locationError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: e.target.value,
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        locationError: "Car location must be given",
      });
    }
    // engine error
    if (e.target.name === "engine") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        engineError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          carInfo: {
            ...carDetailsInput.carInfo,
            [e.target.name]: e.target.value,
          },
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        engineError: "Engine info must be given",
      });
    }
    // fuel error
    if (e.target.name === "fuel") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        fuelError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          carInfo: {
            ...carDetailsInput.carInfo,
            [e.target.name]: e.target.value,
          },
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        fuelError: "fuel info must be given",
      });
    }
    // doors error
    if (e.target.name === "doors") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        doorsError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          carInfo: {
            ...carDetailsInput.carInfo,
            [e.target.name]: Number(e.target.value),
          },
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        doorsError: "doors info must be given",
      });
    }
    // mileage
    if (e.target.name === "mileage") {
      const value = e.target.value;
      return setCarDetailsInput({
        ...carDetailsInput,
        carInfo: {
          ...carDetailsInput.carInfo,
          [e.target.name]: e.target.value,
        },
      });
    }
    // transmission
    if (e.target.name === "transmission") {
      const value = e.target.value;
      return setCarDetailsInput({
        ...carDetailsInput,
        carInfo: {
          ...carDetailsInput.carInfo,
          [e.target.name]: e.target.value,
        },
      });
    }
    // passenger error
    if (e.target.name === "passenger") {
      const value = e.target.value;
      setCarDetailsInputError({
        ...carDetailsInputError,
        passengerError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          carInfo: {
            ...carDetailsInput.carInfo,
            [e.target.name]: Number(e.target.value),
          },
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        passengerError: "passenger info must be given",
      });
    }

    // car features error
    if (e.target.name === "features") {
      const value = e.target.value.split(",");
      setCarDetailsInputError({
        ...carDetailsInputError,
        featuresError: "",
      });
      if (value.length > 0) {
        return setCarDetailsInput({
          ...carDetailsInput,
          [e.target.name]: value,
        });
      }
      return setCarDetailsInputError({
        ...carDetailsInputError,
        featuresError: "This field can't be empty",
      });
    }

    setCarDetailsInput({ ...carDetailsInput, [e.target.name]: e.target.value });
  };

  const validateFormStep = () => {
    let isValid = true;
    let errors = { ...carDetailsInputError };

    if (formStepNo === 0) {
      if (!carDetailsInput.carModel.trim()) {
        errors.carModelError = "car name is required!";
        isValid = false;
      }
      if (!carDetailsInput.image) {
        errors.imageError = "Image is required!";
        isValid = false;
      }
      if (!carDetailsInput.description.trim()) {
        errors.descriptionError = "description is required!";
        isValid = false;
      }
      if (!carDetailsInput.carType.trim()) {
        errors.carTypeError = "car category is required!";
        isValid = false;
      }
      if (!carDetailsInput.location.trim()) {
        errors.locationError = "car location is required!";
        isValid = false;
      }
      if (!carDetailsInput.dailyRentalPrice) {
        errors.dailyRentalPriceError = "Rental price is required!";
        isValid = false;
      }
      if (!carDetailsInput.vehicleRegistrationNumber.trim()) {
        errors.vehicleRegistrationNumberError = "Registration no is required!";
        isValid = false;
      }
    } else if (formStepNo === 1) {
      if (!carDetailsInput.carInfo.engine.trim()) {
        errors.engineError = "Engine info is required!";
        isValid = false;
      }
      if (!carDetailsInput.carInfo.fuel.trim()) {
        errors.fuelError = "Fuel info is required!";
        isValid = false;
      }
      if (!carDetailsInput.carInfo.doors) {
        errors.doorsError = "Door info is required!";
        isValid = false;
      }
      if (!carDetailsInput.carInfo.passenger) {
        errors.passengerError = "Passenger info is required!";
        isValid = false;
      }
      if (!carDetailsInput.features.join(",").trim()) {
        errors.featuresError = "Features is required!";
        isValid = false;
      }
    }

    setCarDetailsInputError(errors);
    return isValid;
  };

  const handleFormStepPrev = () => {
    if (formStepNo !== 0 && validateFormStep()) {
      setFormStepNo((prev) => prev - 1);
    }
  };
  const handleFormStepNext = () => {
    if (formStepNo !== formHeadlineArray?.length - 1 && validateFormStep()) {
      setFormStepNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 60, behavior: "smooth" });
  }, [formStepNo]);

  const handleCarAddOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", carDetailsInput.image);
    setCarDataUploadLoading(true);
    try {
      // Upload image to ImgBB
      const imgBBResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbAPI}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const imgBBData = await imgBBResponse.json();
      if (imgBBData.success) {
        // Prepare the car data to be sent to the server
        // console.log(imgBBData?.data?.url);
        const { image, imageName, ...rest } = carDetailsInput;
        const carDataFull = { ...rest, imageUrl: imgBBData?.data?.url };
        // console.log(carDataFull);
        // Make a POST request to your server
        const serverData = await axiosCredentialInstance.post(
          `caravan/cars/add-car`,
          carDataFull
        );
        // handle if error happen
        if (serverData.status !== 201) {
          setCarDataUploadLoading(false);
          throw new Error(serverData.message || "Failed to submit car data");
        }
        // Handle successful submission
        setCarDataUploadLoading(false);
        toast.success("Car added. pending approval");
        // Reset the form after successful submission
        resetForm();
      }
    } catch (error) {
      toast.error(error.message);
      setCarDataUploadLoading(false);
    }
  };
  // Function to reset the form to its initial state
  const resetForm = () => {
    setCarDetailsInput({
      carModel: "",
      carType: "",
      year: new Date(),
      adminApproval: "pending",
      dailyRentalPrice: "",
      availability: true,
      vehicleRegistrationNumber: "",
      features: [],
      description: "",
      bookingCount: 0,
      image: null,
      imageName: "",
      location: "",
      carInfo: {
        engine: "",
        fuel: "",
        mileage: "",
        transmission: "",
        doors: "",
        passenger: "",
      },
      addedBy: {
        userId: user?.uid,
        name: user?.displayName,
        email: user?.email,
      },
      dateAdded: new Date(),
      bookingStatus: "available",
    });

    // Reset errors if any
    setCarDetailsInputError({
      carModelError: "",
      carTypeError: "",
      imageError: "",
      descriptionError: "",
      dailyRentalPriceError: "",
      vehicleRegistrationNumberError: "",
      locationError: "",
      engineError: "",
      fuelError: "",
      doorsError: "",
      passengerError: "",
      featuresError: "",
    });

    // Optionally, reset the form step to the first step
    setFormStepNo(0);
  };

  // console.log(carDetailsInput, carDetailsInput?.imageName);

  return (
    <>
      <form className="space-y-4 " onSubmit={handleCarAddOnSubmit}>
        <>{handleFormContent()}</>
        <div className="w-full flex items-center justify-center gap-8 pt-5">
          <div className="w-full flex justify-end">
            <button
              className={`block w-1/2 p-3 text-center font-bold rounded-sm ${
                formStepNo === 0
                  ? "text-gray-50 bg-primary-orange/50"
                  : "text-gray-50 bg-primary-orange"
              }`}
              onClick={handleFormStepPrev}
              disabled={formStepNo === 0}
            >
              Previous page
            </button>
          </div>
          <div className="w-full">
            {formStepNo !== formHeadlineArray?.length - 1 ? (
              <a
                className="block w-1/2 p-3 text-center font-bold rounded-sm text-gray-50 bg-primary-orange"
                onClick={handleFormStepNext}
                // type="button"
                // disabled={!validateFormStep()}
              >
                Next page
              </a>
            ) : (
              <button
                className="block w-1/2 p-3 text-center font-bold rounded-sm text-gray-50 bg-primary-orange"
                type="submit"
              >
                {carDataUploadLoading ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="loading loading-spinner loading-md"></span>
                  </>
                ) : (
                  "Submit Car"
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AddCarForm;
