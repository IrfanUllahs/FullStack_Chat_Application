import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { logout } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertDialogExample from "./Alert"; // Adjust the import path accordingly

function Messages() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className="bg-[#6E00FF] sm:w-[70px] sm:h-full w-full rounded-lg overflow-hidden px-2 sm:py-8 py-4 flex sm:flex-col items-center justify-between">
      <Link to={user && "/profile"}>
        <img
          src={
            user?.userData?.image
              ? user?.userData?.image
              : "https://img.freepik.com/premium-photo/3d-avatar-cartoon-character_113255-96804.jpg?w=740"
          }
          alt="profile picture"
          className="rounded-full h-10 w-10"
        />
      </Link>
      {/* menu section */}
      <div className="flex sm:flex-col sm:gap-8 gap-5 text-white">
        <Link to={"/"}>
          <AiOutlineHome className="sm:text-4xl text-2xl cursor-pointer hover:text-gray-300" />
        </Link>
      </div>
      {/* logout button with alert dialog */}
      <div className="text-white hover:text-gray-300">
        {user ? (
          <AlertDialogExample onLogout={handleLogout}></AlertDialogExample>
        ) : (
          <div className="bg-red-500 sm:w-32 w-20 h-10 rounded-lg "></div>
        )}
      </div>
    </div>
  );
}

export default Messages;
