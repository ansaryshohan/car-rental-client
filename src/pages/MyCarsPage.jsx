import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PageHeader from "../components/shared/PageHeader";
// import useModalReviewContext from "../hooks/useModalReviewContext";
import axiosCredentialInstance from "../axios/credentialAxios";
import Pagination from "../components/allCarsComp/Pagination";
import MyCarTableRow from "../components/myCarsComp/MyCarTableRow";
import { useAuthContext } from "../hooks/useAuthContext";
import Title from "../components/shared/Title";

const MyCarsPage = () => {
  const { user } = useAuthContext();
  const [myCars, setMyCars] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  // const { updatingReviewId, setUpdatingReviewId } = useModalReviewContext();

  useEffect(() => {
    if (!user?.email) return;

    let isMounted = true;

    const fetchUserCars = async () => {
      try {
        const { data } = await axiosCredentialInstance.get(
          `caravan/cars/user-cars?userEmail=${user.email}`
        );
        if (isMounted) {
          const totalPageNumberCount = Math.ceil(
            Number(data?.data?.totalNoOfCars) / 5
          );
          setTotalPageNumber(totalPageNumberCount);
          setMyCars(data?.data?.allCarsByUser);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchUserCars();
    // cleanup====
    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleMyCarDelete = (carId) => {
    // sweet alert: first get the confirmation of delete
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosCredentialInstance.delete(
          `caravan/cars/${carId}`,
          {
            data: { userEmail: user.email },
          }
        );
        // console.log(deletedData,gameReviewData);
        if (data?.deletedData?.deletedCount > 0) {
          setMyCars(data?.carDataAfterDelete);
          Swal.fire({
            title: "Deleted!",
            text: "Your Car has been deleted.",
            icon: "success",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Car delete cancelled :)",
          icon: "error",
        });
      }
    });
  };

  // const handleUpdateModalData = async (reviewId) => {
  //   flushSync(setUpdatingReviewId(reviewId));
  //   if (updatingReviewId) {
  //     document.getElementById("update-modal").showModal();
  //   }
  // };
  // console.log(myCars);

  return (
    <div className="">
      <Title title={"MyCars | Caravan"} />
      {/* <UpdateReviewModal setMyReviews={setMyReviews} /> */}
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
          <PageHeader titleText={"My Cars"} />
          <div className="w-full px-10 py-10 mx-auto bg-gray-background">
            {myCars?.length > 0 ? (
              <div className="overflow-x-auto py-10">
                <table className="table text-white mb-6">
                  {/* head */}
                  <thead className="text-slate-400 text-lg">
                    <tr className="border-b border-white">
                      <th>SI</th>
                      <th>Car Info</th>
                      <th className="text-center">Booking Count</th>
                      <th>Availability</th>
                      <th>Approval</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCars?.map((singleMyCarData, index) => (
                      <MyCarTableRow
                        key={singleMyCarData._id}
                        indexNo={index}
                        rowData={singleMyCarData}
                        handleMyCarDelete={handleMyCarDelete}
                        // handleUpdateModalData={handleUpdateModalData}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-end pr-15">
                  <Pagination
                    currentPageNo={currentPageNo}
                    setCurrentPageNo={setCurrentPageNo}
                    totalPageNumber={totalPageNumber}
                  />
                </div>
              </div>
            ) : (
              <div className="w-10/12 mx-auto h-full flex justify-center items-center py-16">
                {" "}
                <h3 className="text-2xl font-bold text-red-600 text-center">
                  No Cars added by You
                </h3>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCarsPage;
