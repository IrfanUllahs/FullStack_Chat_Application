import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Avatar,
  Center,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setUser } from "../redux/features/authSlice";
import UploadWidget from "../components/UploadWidget";
const baseURL = import.meta.env.VITE_API_URL;
function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const [name, setName] = useState(user?.userData?.name || "");
  const [image, setImage] = useState(user?.userData?.image || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user?.userData?.name);
      setImage(user?.userData?.image);
    }
  }, [user]);
  const handleUpdate = async () => {
    if (name !== user?.userData?.name || image) {
      try {
        setIsLoading(true);
        let result;
        if (image) {
          result = await axios.patch(
            `${baseURL}/api/user/update/${user?.userData?._id}`,
            {
              image,
            }
          );
        }
        if (name) {
          result = await axios.patch(
            `${baseURL}/api/user/update/${user?.userData?._id}`,
            {
              name,
            }
          );
        }

        let storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser.userData = {
          ...storedUser.userData,
          ...result.data.userData,
        };
        localStorage.setItem("user", JSON.stringify(storedUser));
        dispatch(setUser(storedUser));
        toast({
          title: "Profile updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Error in updating",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(error.response.data.message);
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Name and image are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAccount = () => {
    // dispatch(deleteUser(user.userData._id));
    toast({
      title: "Account deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#6E00FF] py-6 px-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md  mb-[150px]">
        <div className="flex items-center justify-center bg-gray-300 rounded-full w-[100px] h-[100px] mx-auto">
          <img
            className="w-full h-full object-cover rounded-full mb-4 "
            src={image}
            alt="Profile"
          />
        </div>
        <div className="flex items-center justify-center  rounded-full w-[100px] h-[100px] mx-auto">
          <UploadWidget
            uwConfig={{
              cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
              uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
              multiple: false,
              folder: "profile",
            }}
            setImage={setImage}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded py-1 px-2 w-full"
          />
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleUpdate}
            className="bg-teal-500 text-white px-4 py-2 rounded text-sm"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
