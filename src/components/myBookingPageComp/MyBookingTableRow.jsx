import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const MyBookingTableRow = ({
  rowData,
  indexNo,
  handleMyBookingDelete,
  // handleUpdateModalData,
}) => {
  const {bookingDate,bookingTime,carData,isConfirmed,_id:bookingId}= rowData;
  const {
    carModel,
    carType,
    dailyRentalPrice,
    imageUrl,
  } = carData;

  const date = new Date(bookingDate);
const formattedDate = date.toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

  return (
    <>
      <tr className="hover:bg-slate-300/30 hover:text-white text-white border-b border-white/40">
        <th>{indexNo + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                <img src={imageUrl} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div className="pl-3">
              <div className="font-bold text-xl">{carModel}</div>
              <div className="text-sm opacity-50">{carType}</div>
              <div className="text-sm opacity-50">
                Rent : {dailyRentalPrice}$
              </div>
            </div>
          </div>
        </td>
        <td className="text-center text-base font-medium">{formattedDate}</td>
        <td>
          <div className="text-center text-base font-medium">{bookingTime}</div>
        </td>
        <td>
          {
            isConfirmed?<div className="badge badge-success">Confirmed</div>:<div className="badge badge-warning">Not Confirmed</div>
          }
        </td>
        <th className="grid place-content-center h-full">
          {/* delete the car booking data */}
          <div className="flex items-center justify-center">
            <button
              id="delete"
              className="btn btn-error  h-auto min-h-3 px-1 py-2"
              onClick={() => handleMyBookingDelete(bookingId)}
            >
              <MdDeleteForever size={14} />
            </button>
            <Tooltip anchorSelect="#delete" clickable place="top-start">
              <button>delete review</button>
            </Tooltip>
          </div>
        </th>
      </tr>
    </>
  );
};

export default MyBookingTableRow