import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosCredentialInstance from "../axios/credentialAxios";
import Pagination from "../components/allCarsComp/Pagination";
import MyBookingTableRow from "../components/myBookingPageComp/MyBookingTableRow";
import PageHeader from "../components/shared/PageHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import Title from "../components/shared/Title";

const MyBookingsPage = () => {
  const { user } = useAuthContext();
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["bookingCars", currentPageNo],
    queryFn: async () => {
      const res = await axiosCredentialInstance.get(
        `caravan/car-booking/user-bookings?perPageData=4&pageNo=${currentPageNo}&userEmail=${user?.email}`
      );
      return res?.data?.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const totalPageNumber = Math.ceil(data?.totalNoOfBookingOfAUser / 4);

  const handleMyBookingDelete = async (bookingId) => {
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
        const deletedData = await axiosCredentialInstance.delete(
          `caravan/car-booking/${bookingId}`,
          { data: { userEmail: user?.email } }
        );
        // console.log(deletedData)
        if (deletedData.status === 200) {
          refetch();
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

  // console.log(data?.bookings[0].bookedCars);
  return (
    <div className="">
      <Title title={"MyBookings | Caravan"} />
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
        <div className="relative w-full h-full lg:w-11/12 top-0 left-[50%] translate-x-[-50%] z-10 text-white ">
          <PageHeader titleText={"My Bookings"} />
          <div className="w-full px-10 py-10 mx-auto bg-gray-background">
            {/*  */}
            {data?.bookings[0]?.bookedCars.length > 0 ? (
              <div className="overflow-x-auto py-10">
                <table className="table text-white mb-6">
                  {/* head */}
                  <thead className="text-slate-400 text-lg">
                    <tr className="border-b border-white">
                      <th>SI</th>
                      <th>Car Info</th>
                      <th className="text-center">Booking Date</th>
                      <th>Booking Time</th>
                      <th>Confirm Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.bookings[0]?.bookedCars.map(
                      (singleBookingData, index) => (
                        <MyBookingTableRow
                          key={singleBookingData._id}
                          indexNo={index}
                          rowData={singleBookingData}
                          handleMyBookingDelete={handleMyBookingDelete}
                          // handleUpdateModalData={handleUpdateModalData}
                        />
                      )
                    )}
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
                  No Booking Made By You Yet
                </h3>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
