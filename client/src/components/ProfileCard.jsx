import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { setCurrentUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
function ProfileCard({ contactUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentUser(contactUser));
    navigate(`/chat/${contactUser?._id}`);
  };

  return (
    <>
      <div
        className="sm:flex justify-betw  console.log(conversator);
een  border-b border-[rgb(180,171,171)] pb-2 mt-3  cursor-pointer hover:bg-gray-300 rounded-lg py-1 px-2  hidden"
        onClick={handleClick}
      >
        <div className="flex gap-4 items-center ">
          <img
            src={
              contactUser?.image?.includes("https://")
                ? contactUser?.image // If the image URL already starts with "https://", use it as is
                : `http://localhost:5000/uploads/${contactUser?.image}` // Otherwise, construct the full URL
            }
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-[#303030] font-semibold text-[15px]">
              {contactUser?.name}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="flex justify-betw  
een  border-b border-[rgb(180,171,171)] pb-2 mt-3  cursor-pointer hover:bg-gray-300 rounded-lg py-1 px-2 sm:hidden"
        onClick={handleClick}
      >
        <div className="flex gap-4 items-center ">
          <img
            src={
              contactUser?.image ||
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h1 className="text-[#303030] font-semibold text-[15px]">
              {contactUser?.name}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
