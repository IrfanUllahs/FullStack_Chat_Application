import React from "react";

import People from "../components/People";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux/features/authSlice";

import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;
import axios from "axios";
function Message() {
  const [searchParam, setSearchParam] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(getUsers(user?.userData?._id));
    };

    if (user?.userData?._id) {
      fetchUser();
    }
  }, [user?.userData?._id]);

  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (!auth) {
      navigate("/auth");
    }
  }, []);

  const handleseenUpdate = async (userId) => {
    let lastSeen = Date.now();
    console.log("Attempting to update last seen...");

    try {
      let result = await axios.patch(`${baseURL}/api/user/update/${userId}`, {
        lastSeen,
      });
      console.log("Last seen updated successfully:", result.data);
    } catch (error) {
      console.log("Error updating last seen:", error);
    }
  };

  useEffect(() => {
    handleseenUpdate(user?.userData?._id);
  }, [user?.userData?._id]);

  return (
    <div className="flex h-full gap-5  ">
      <div className="flex flex-col gap-10 flex-1 ">
        {/* <Groups profiles={profiles} /> */}
        {user && (
          <>
            <Search setSearchParam={setSearchParam} />
            <People searchParam={searchParam} />
          </>
        )}
      </div>
    </div>
  );
}

export default Message;
