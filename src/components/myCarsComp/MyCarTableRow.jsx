import { FaEye, FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
// import Ratings from "../shared/Ratings";

const MyCarTableRow = ({
  rowData,
  indexNo,
  handleReviewDelete,
  // handleUpdateModalData,
}) => {
  const {
    _id,
    carModel,
    carType,
    dailyRentalPrice,
    bookingCount,
    imageUrl,
    availability,
    adminApproval,
  } = rowData;

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
                Daily Rent : {dailyRentalPrice}$
              </div>
            </div>
          </div>
        </td>
        <td className="text-center text-xl font-medium">{bookingCount}</td>
        <td>
          {availability ? (
            <div className="badge badge-success">Available</div>
          ) : (
            <div className="badge badge-warning">Booked</div>
          )}
        </td>
        <td>
          <div className="badge badge-neutral">{adminApproval}</div>
        </td>
        <th className="grid place-content-center gap-1 h-full">
          {/* single car view */}
          <div className="flex items-center justify-center">
            <Link to={`/cars/${_id}`}>
              <button
                id="view"
                className="btn btn-info h-auto min-h-3 px-1 py-2"
              >
                <FaEye size={12} />
              </button>
              <Tooltip anchorSelect="#view" clickable>
                <button>view review</button>
              </Tooltip>
            </Link>
          </div>
          {/* update car data */}
          <div className="flex items-center justify-center">
            <button
              id="update"
              className="btn btn-success  h-auto min-h-3 px-1 py-2"
              onClick={() => handleUpdateModalData(_id)}
            >
              <FaPen size={12} />
            </button>
            <Tooltip anchorSelect="#update" clickable place="top-start">
              <button>update review</button>
            </Tooltip>
          </div>
          {/* delete the car data */}
          <div className="flex items-center justify-center">
            <button
              id="delete"
              className="btn btn-error  h-auto min-h-3 px-1 py-2"
              onClick={() => handleReviewDelete(_id)}
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

export default MyCarTableRow;
