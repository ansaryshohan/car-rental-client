import { useState } from "react";
import AddCarForm from "../components/addCarsComp/AddCarForm";
import PageHeader from "../components/shared/PageHeader";
import Title from "../components/shared/Title";

const AddCarsPage = () => {
  const [formStepNo, setFormStepNo] = useState(0);
  const formHeadlineArray = ["Car Details", "Car Information", "User Details"];

  return (
    <div className="">
      <Title title={"Add-Car | Caravan"} />

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
          <PageHeader titleText={"Add A New Car"} />
          <div className="w-full mx-auto pt-8 pb-10 px-4 md:px-14 backdrop-blur-2xl bg-black/40 rounded-b-2xl">
            {/* progress bar */}
            <div className="px-5 pb-3">
              <progress
                className="progress text-primary-orange w-full h-4"
                value={(100 / formHeadlineArray?.length) * (formStepNo + 1)}
                max="100"
              ></progress>
            </div>
            {/* form title */}
            <h3 className="w-full text-center py-5 text-2xl font-bold text-primary-orange">
              {formHeadlineArray[formStepNo]}
            </h3>
            <AddCarForm
              formStepNo={formStepNo}
              setFormStepNo={setFormStepNo}
              formHeadlineArray={formHeadlineArray}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarsPage;
