import React from "react";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteMessage } from "../redux/features/messageSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
function Message({ own, message }) {
  const dispatch = useDispatch();
  const handleDelete = async (req, res) => {
    try {
      let result = await axios.delete(
        `${baseURL}/api/message/delete/${message._id}`
      );
      console.log(result.data);
      toast.success(result.data.message);
      dispatch(deleteMessage(message._id));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div
      className={`${
        own && "ml-auto flex flex-col  max-w-[90%] md:max-w-[60%] "
      }`}
    >
      <div
        className={`flex gap-4 items-center  ${
          !own && "max-w-[80%] md:max-w-[60%]"
        }  `}
      >
        <RiDeleteBin6Line
          className="text-[20px] mb-4 text-red-400 cursor-pointer"
          onClick={handleDelete}
        />
        <div className="w-[85%]">
          <div
            className={` rounded-[16px] sm:px-6 sm:py-2 py-1 px-2 sm:text-[16px] text-[12px]   ${
              own
                ? " bg-[#9747FF] text-white  "
                : "bg-[#E7E7E7] text-black w-fit  "
            }`}
          >
            {message.text}
          </div>
          <span
            className={`text-[#707070]${
              own && "ml-auto text-right mr-3"
            } mt-3 ml-3 sm:text-[15px]  text-[11px] font-light`}
          >
            {format(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Message;
