import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import InputField from "../Login&Register/InputField";

const AddCarForm = () => {
  const { user } = useAuthContext();
  const [carDataUploadLoading, setCarDataUploadLoading] = useState(false);
  const [reviewInput, setReviewInput] = useState({
    gameName: "",
    image: "",
    review: "",
    rating: "",
    publishYear: new Date(),
    genre: "action",
    userEmail: "",
    comments: [],
  });

  const [reviewInputError, setReviewInputError] = useState({
    gameNameError: "",
    imageError: "",
    reviewError: "",
    ratingError: "",
  });

  const renderYearContent = (year) => {
    // console.log(year)
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  };

  const handleReviewInputOnChange = (e) => {
    // gameName error
    // if (e.target.name === "gameName") {
    //   const value = e.target.value;
    //   setReviewInputError({
    //     ...reviewInputError,
    //     gameNameError: "",
    //   });
    //   if (value.length > 0) {
    //     return setReviewInput({
    //       ...reviewInput,
    //       [e.target.name]: e.target.value,
    //     });
    //   }
    //   return setReviewInputError({
    //     ...reviewInputError,
    //     gameNameError: "provide a game name",
    //   });
    // }
    // image error
    // if (e.target.name === "image") {
    //   const value = e.target.value;
    //   setReviewInputError({
    //     ...reviewInputError,
    //     imageError: "",
    //   });
    //   if (value.length > 0) {
    //     return setReviewInput({
    //       ...reviewInput,
    //       [e.target.name]: e.target.value,
    //     });
    //   }
    //   return setReviewInputError({
    //     ...reviewInputError,
    //     imageError: "provide a game image url",
    //   });
    // }
    // review error
    // if (e.target.name === "review") {
    //   const value = e.target.value;
    //   setReviewInputError({
    //     ...reviewInputError,
    //     reviewError: "",
    //   });
    //   if (value.length > 0) {
    //     return setReviewInput({
    //       ...reviewInput,
    //       [e.target.name]: e.target.value,
    //     });
    //   }
    //   return setReviewInputError({
    //     ...reviewInputError,
    //     reviewError: "give a review about the game",
    //   });
    // }
    // rating error
    // if (e.target.name === "rating") {
    //   const value = Number(e.target.value);
    //   setReviewInputError({
    //     ...reviewInputError,
    //     ratingError: "",
    //   });
    //   if (value >= 0 && value <= 10) {
    //     return setReviewInput({
    //       ...reviewInput,
    //       [e.target.name]: e.target.value,
    //     });
    //   }
    //   return setReviewInputError({
    //     ...reviewInputError,
    //     ratingError: "give a rating between 0-10",
    //   });
    // }
    // setReviewInput({ ...reviewInput, [e.target.name]: e.target.value });
  };

  const handleAddReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    setCarDataUploadLoading(true);

    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbAPI}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCarDataUploadLoading(false);
        console.log(data?.data?.url);
      });
  };
  return (
    <>
      <form className="space-y-4 " onSubmit={handleAddReviewSubmit}>
        <div className="space-y-1 text-sm">
          <InputField
            label={"Game Title"}
            error={reviewInputError.gameNameError}
            customClassName="text-white"
          >
            <input
              type="text"
              name="gameName"
              id="gameName"
              defaultValue={reviewInput.gameName}
              onChange={handleReviewInputOnChange}
              placeholder="Game Title"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
              // required
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField
            label={"Game Image"}
            error={reviewInputError.imageError}
            customClassName="text-white"
          >
            <input
              type="file"
              name="image"
              id="image"
              defaultValue={reviewInput.image}
              onChange={handleReviewInputOnChange}
              placeholder="Game Image Url"
              className="file-input w-full rounded-md border-gray-300 bg-gray-50 outline-0 text-gray-600"
              // required
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField
            label={"Review details"}
            error={reviewInputError.reviewError}
            customClassName="text-white"
          >
            <textarea
              type="text"
              name="review"
              id="review"
              defaultValue={reviewInput.review}
              onChange={handleReviewInputOnChange}
              placeholder="Game review details"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0 resize-none"
              // required
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm flex flex-col lg:flex-row justify-center lg:items-center lg:justify-stretch lg:gap-5">
          <InputField
            label={"Enter a Rating (0-10):"}
            error={reviewInputError.ratingError}
            customClassName="text-white"
          >
            <input
              type="number"
              name="rating"
              id="rating"
              defaultValue={reviewInput.rating}
              onChange={handleReviewInputOnChange}
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600 outline-0"
              placeholder="0-10"
              min={0}
              max={10}
              // required
            />
          </InputField>
          <InputField label={"Publishing Year:"} customClassName="text-white">
            <DatePicker
              selected={reviewInput.publishYear}
              renderYearContent={renderYearContent}
              showYearPicker
              // defaultValue={reviewInput.publishYear}
              onChange={(date) =>
                setReviewInput({
                  ...reviewInput,
                  publishYear: date,
                })
              }
              dateFormat="yyyy"
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800  bg-gray-50 outline-0"
            />
          </InputField>

          <InputField label={"Genre "} customClassName="text-white">
            <select
              name="genre"
              id="genre"
              defaultValue={reviewInput.genre}
              onChange={handleReviewInputOnChange}
              className="w-full px-4 py-3 rounded-md border-gray-300  text-gray-800 focus:border-violet-600 outline-0 bg-gray-50"
              // required
            >
              <option value="action">Action</option>
              <option value="rpg">RPG</option>
              <option value="adventure">Adventure</option>
              <option value="survival">Survival</option>
              <option value="farming">Farming</option>
              <option value="other">Other</option>
            </select>
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField label={"User Email"} customClassName="text-white">
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              defaultValue={user?.email}
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 focus:border-violet-600 outline-0 resize-none"
              disabled
            />
          </InputField>
        </div>
        <div className="space-y-1 text-sm">
          <InputField label={"User Name"} customClassName="text-white">
            <input
              type="text"
              name="userName"
              id="userName"
              defaultValue={user?.displayName}
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 focus:border-violet-600 outline-0 resize-none"
              disabled
            />
          </InputField>
        </div>
        <div className="w-full grid place-items-center">
        <button
          className="block w-1/2 mx-auto p-3 text-center font-bold rounded-sm text-gray-50 bg-primary-orange"
          type="submit"
        >
          {carDataUploadLoading ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
            </>
          ) : (
            "Add Car"
          )}
        </button>
        </div>
      </form>
    </>
  );
};

export default AddCarForm;
