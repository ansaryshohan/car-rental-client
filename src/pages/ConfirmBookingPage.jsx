import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosCredentialInstance from "../axios/credentialAxios";
import InputField from "../components/Login&Register/InputField";
import PageHeader from "../components/shared/PageHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import Title from "../components/shared/Title";

const ConfirmBookingPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["confirmCar", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_backend}caravan/cars/${id}`
      );
      return res?.data?.data;
    },
  });
  const [bookingTimeAndDate, setBookingTimeAndDate] = useState({
    bookingDate: new Date(),
    bookingTimeStart: new Date(),
    bookingTimeEnd: new Date(),
  });

  // State for validation errors
  const [validationErrors, setValidationErrors] = useState("");

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const {
    _id,
    carModel,
    carType,
    dailyRentalPrice,
    availability,
    carInfo: { passenger, doors },
    addedBy,
    location,
  } = data;

  const handleConfirmBooking = async () => {
    setValidationErrors("");

    //  Booking Date should not be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00 for accurate date comparison
    if (bookingTimeAndDate.bookingDate < today) {
      setValidationErrors("Booking date cannot be in the past.");
      toast.error("Booking date cannot be in the past.");
      return;
    }

    // Start & End time should not be the same
    if (
      bookingTimeAndDate.bookingTimeStart.getTime() ===
      bookingTimeAndDate.bookingTimeEnd.getTime()
    ) {
      setValidationErrors("Start time and end time cannot be the same.");
      toast.error("Start time and end time cannot be the same.");
      return;
    }

    // Booking Time End should be after Booking Time Start
    if (
      bookingTimeAndDate.bookingTimeEnd <= bookingTimeAndDate.bookingTimeStart
    ) {
      setValidationErrors("End time should be after start time.");
      toast.error("End time should be after start time.");
      return;
    }

    // All fields should be filled
    if (
      !bookingTimeAndDate.bookingDate ||
      !bookingTimeAndDate.bookingTimeStart ||
      !bookingTimeAndDate.bookingTimeEnd
    ) {
      setValidationErrors("All fields are required.");
      toast.error("All fields are required.");
      return;
    }
    // formatting date
    const startDate = new Date(bookingTimeAndDate.bookingDate);
    const formattedDate = startDate.toISOString();

    // formatting time of booking time start
    const startTime = new Date(bookingTimeAndDate.bookingTimeStart);
    const formattedStartTime = startTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    // formatting time of booking time end
    const endTime = new Date(bookingTimeAndDate.bookingTimeEnd);
    const formattedEndTime = endTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // the booking Car data
    const bookingData = {
      userEmail: user?.email,
      bookedCars: [
        {
          carId: _id,
          bookingDate: formattedDate,
          bookingTime: `${formattedStartTime} - ${formattedEndTime}`,
          isConfirmed: false,
        },
      ],
    };

    const { data } = await axiosCredentialInstance.post(
      `caravan/car-booking/add-bookings`,
      bookingData
    );
    if (data.status === "success") {
      toast.success(data.message);
      setValidationErrors("");
      navigate(`/cars/${_id}`);
      return;
    }
    toast.success(data.message);
  };

  return (
    <div className="">
      <Title title={"Car-booking | Caravan"} />

      <div
        className="relative w-full min-h-screen pb-10 pt-[17vh]"
        style={{
          background:
            "linear-gradient(to right, #ab9d90 0%,#d6c9c0 22%,#d6c9c0 80%,#d6c9c0 80%,#ab9d90 100%)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative w-full h-full md:w-11/12 top-0 left-[50%] translate-x-[-50%] z-10 text-white ">
          <PageHeader titleText={"Confirm booking"} />
          {/* all the cars section with pagination component */}
          <div className="w-full mx-auto pt-8 pb-10 px-10 bg-black flex flex-col justify-between gap-6 items-start">
            {/* time and date picker form  */}
            <fieldset className="fieldset w-full bg-gray-400/20 border border-white p-4 rounded-box">
              <legend className="fieldset-legend text-xl font-bold text-white">
                Booking Date and Time
              </legend>
              <div className="flex flex-col md:flex-row justify-around items-center gap-5 px-4 pb-5">
                <div className="w-full md:w-1/3">
                  <InputField label={"Booking Date"}>
                    <DatePicker
                      selected={bookingTimeAndDate.bookingDate}
                      onChange={(date) =>
                        setBookingTimeAndDate({
                          ...bookingTimeAndDate,
                          bookingDate: date,
                        })
                      }
                      className="w-10/12 pl-3 px-2 py-2 text-lg text-white font-medium  rounded-2xl"
                    />
                  </InputField>
                </div>
                <div className="flex justify-between items-center px-4 gap-5 flex-1 w-full md:w-2/3">
                  <InputField label={"Booking Time Start"}>
                    <DatePicker
                      selected={bookingTimeAndDate.bookingTimeStart}
                      className="w-10/12 pl-3 px-2 py-2 text-lg text-white font-medium  rounded-2xl"
                      onChange={(date) =>
                        setBookingTimeAndDate({
                          ...bookingTimeAndDate,
                          bookingTimeStart: date,
                        })
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </InputField>
                  <InputField label={"Booking Time End"}>
                    <DatePicker
                      selected={bookingTimeAndDate.bookingTimeEnd}
                      className="w-10/12 pl-3 px-2 py-2 text-lg text-white font-medium  rounded-2xl"
                      onChange={(date) =>
                        setBookingTimeAndDate({
                          ...bookingTimeAndDate,
                          bookingTimeEnd: date,
                        })
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </InputField>
                </div>
              </div>
            </fieldset>
            {/* car info and user data  */}
            <fieldset className="fieldset w-full bg-gray-400/20 border border-white p-4 rounded-box">
              <legend className="fieldset-legend text-xl font-bold text-white">
                Car info & User
              </legend>
              <div className="flex flex-col md:flex-row justify-around items-center md:items-stretch gap-5 px-4 pb-5">
                {/* car info div */}
                <div className="bg-black rounded-2xl px-2 py-4 text-white w-full md:w-1/2 pl-5 space-y-2">
                  <h3 className="text-base font-medium text-dull-text">
                    Car Name:{" "}
                    <span className="text-lg font-bold tracking-wide text-white">
                      {carModel}
                    </span>
                  </h3>
                  <p className="text-base font-medium text-dull-text">
                    {" "}
                    Car Type:{" "}
                    <span className="text-lg font-bold tracking-wide text-white">
                      {carType}
                    </span>
                  </p>
                  <p className="text-base font-medium text-dull-text">
                    Rent Price:{" "}
                    <span className="text-lg font-bold tracking-wide text-white">
                      {dailyRentalPrice}$ /per day
                    </span>
                  </p>
                </div>
                {/* user info div */}
                <div className="bg-black rounded-2xl px-2 py-4 text-white w-full md:w-1/2 pl-5 space-y-4">
                  <h3 className="text-base font-medium text-dull-text">
                    User Name:{" "}
                    <span className="text-lg font-bold tracking-wide text-white">
                      {user?.displayName || "N/A"}
                    </span>
                  </h3>
                  <p className="text-base font-medium text-dull-text">
                    {" "}
                    User Email:{" "}
                    <span className="text-lg font-bold tracking-wide text-white">
                      {user?.email}
                    </span>
                  </p>
                </div>
              </div>
            </fieldset>

            {/* confirm booking button */}
            <div className=" w-full bottom-12  flex items-center justify-center">
              <button
                onClick={handleConfirmBooking}
                className="px-12 py-3 rounded-4xl border border-primary-orange text-lg font-bold bg-primary-orange text-white hover:transition-all hover:duration-500 hover:scale-x-[95%]"
              >
                {" "}
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingPage;
